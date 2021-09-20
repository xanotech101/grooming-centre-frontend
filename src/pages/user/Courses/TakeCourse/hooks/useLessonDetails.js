import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useTakeCourse } from "../../../../../contexts";

const getLesson = (data, id) => {
  const lesson = data.lessons.find((lesson) => lesson.id === id);
  return lesson;
};

/**
 * Lesson state `Manager`
 * @param { Array<{}> | null } sidebarLinks
 * 
 * @returns Object { 
 *  lesson: `Object` | `null`, 
 *  isLoading: `boolean`,
 *  previousIsDisabled: `boolean`,
    completeAndContinueIsDisabled: `boolean`,
    handlePrevious: `() => void`,
    handleCompleteAndContinue: `() => void`, 
 * }
 */
const useLessonDetails = (sidebarLinks) => {
  const { lesson_id: lessonId, course_id: courseId } = useParams();
  const { push } = useHistory();
  const takeCourseManger = useTakeCourse();
  const { state } = takeCourseManger;

  const [lesson, setLesson] = useState(null);
  const [currentLink, setCurrentLink] = useState();

  useEffect(() => {
    const index = sidebarLinks?.findIndex((link) => link.id === lessonId);
    const link = { index, ...sidebarLinks?.[index] };
    setCurrentLink(link);
  }, [sidebarLinks, lessonId]);

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

  useEffect(() => {
    if (state.data) {
      const lesson = getLesson(state.data, lessonId);
      setLesson(lesson);
    }
  }, [state?.data, lessonId]);

  const isLoading = state.isLoading;
  const previousIsDisabled = isLoading || currentLink?.index <= 0;
  const completeAndContinueIsDisabled =
    isLoading ||
    currentLink?.index ===
      sidebarLinks?.filter((link) => !link.disabled).length - 1;

  return {
    lesson,
    isLoading,
    previousIsDisabled,
    completeAndContinueIsDisabled,
    handlePrevious,
    handleCompleteAndContinue,
  };
};

export default useLessonDetails;
