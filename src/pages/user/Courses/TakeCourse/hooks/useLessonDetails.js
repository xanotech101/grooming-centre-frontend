import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCache, useTakeCourse } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { requestLessonDetails } from "../../../../../services";

/**
 * Lesson state `Manager`
 * @param { Array<{}> | null } sidebarLinks
 *
 * @returns {{
 *  lesson: Lesson<{}> | null,
 *  isLoading: boolean,
 *  previousIsDisabled: boolean,
 *  completeAndContinueIsDisabled: boolean,
 *  handlePrevious: () => void,
 *  handleCompleteAndContinue: () => void,
 * }}
 */
const useLessonDetails = (sidebarLinks) => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { lesson_id: lessonId, course_id: courseId } = useParams();
  const { push } = useHistory();

  // To make sure the `Sidebar` links renders correctly
  useTakeCourse();

  const [lessonDetails, setLessonDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });
  const [currentLink, setCurrentLink] = useState();

  const handlePrevious = () => {
    const previousLink = sidebarLinks[currentLink.index - 1];
    push(`/courses/take/${courseId}/lessons/${previousLink.id}`);
  };
  const handleCompleteAndContinue = () => {
    const nextLink = sidebarLinks[currentLink.index + 1];

    if (nextLink.type !== "assessment") {
      push(`/courses/take/${courseId}/lessons/${nextLink.id}`);
    } else {
      push(`/courses/take/${courseId}/assessment`);
    }
  };

  const fetcher = useCallback(async () => {
    const { lesson } = await requestLessonDetails(lessonId);
    return lesson;
  }, [lessonId]);
  const fetchCourseDetails = useCallback(async () => {
    setLessonDetails({ loading: true });

    try {
      const lessonDetails = await handleGetOrSetAndGet(lessonId, fetcher);
      if (componentIsMount) setLessonDetails({ data: lessonDetails });
    } catch (err) {
      if (componentIsMount) setLessonDetails({ err: err.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, componentIsMount]);

  useEffect(() => {
    const index = sidebarLinks?.findIndex((link) => link.id === lessonId);
    const link = { index, ...sidebarLinks?.[index] };
    setCurrentLink(link);
  }, [sidebarLinks, lessonId]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const lesson = lessonDetails.data;
  const isLoading = lessonDetails.loading;
  const error = lessonDetails.err;
  const previousIsDisabled = isLoading || currentLink?.index <= 0;
  const completeAndContinueIsDisabled =
    isLoading ||
    currentLink?.index ===
      // sidebarLinks?.filter((link) => !link.disabled).length - 1; // TODO:redo or remove
      sidebarLinks?.filter((link) => !link.disabled).length - 2;

  return {
    lesson,
    isLoading,
    error,
    previousIsDisabled,
    completeAndContinueIsDisabled,
    handlePrevious,
    handleCompleteAndContinue,
  };
};

export default useLessonDetails;
