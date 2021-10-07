import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCache, useTakeCourse } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import {
  requestEndLesson,
  requestLessonDetails,
} from "../../../../../services";

const usePlayer = ({ lessonHasBeenCompleted }) => {
  const [videoPlayedCount, setVideoPlayedCount] = useState(0);
  const [videoHasBeenCompleted, setVideoHasEnded] = useState();

  useEffect(() => {
    setVideoHasEnded(lessonHasBeenCompleted);
  }, [lessonHasBeenCompleted]);

  const [videoIsPlaying, setVideoIsPlaying] = useState(false);

  const handleVideoProgress = ({
    // playedSeconds,
    // loadedSeconds, loaded
    played,
  }) => {
    setVideoPlayedCount(played);
  };

  const handleVideoHasEnded = () => {
    setVideoHasEnded(true);
  };

  const handleVideoPlayToggle = () => {
    setVideoIsPlaying((prev) => !prev);
  };

  return {
    videoPlayedCount,
    handleVideoProgress,
    videoHasBeenCompleted,
    handleVideoHasEnded,
    videoIsPlaying,
    handleVideoPlayToggle,
  };
};

/**
 * Lesson state `Manager`
 * @param { Array<{}> | null } sidebarLinks
 *
 * @returns {{
 *  lesson: Lesson<{}> | null,
 *  isLoading: boolean,
 *  videoPlayedCount: number,
 *  videoHasBeenCompleted: boolean,
 *  previousIsDisabled: boolean,
 *  completeAndContinueIsDisabled: boolean,
 *  handlePrevious: () => void,
 *  handleCompleteAndContinue: () => void,
 *  handleVideoProgress: (progress: ReactPlayerProgress) => void,
 *  handleVideoHasEnded: () => void,
 * }}
 */
const useLessonDetails = (sidebarLinks) => {
  const { handleGetOrSetAndGet, handleDelete } = useCache();
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
  const videoPlayerManager = usePlayer({
    lessonHasBeenCompleted: lessonDetails.data?.hasEnded, // TODO:replace with a dynamic `lesson.hasEnded`
  });

  const [currentLink, setCurrentLink] = useState();

  const handlePrevious = () => {
    const previousLink = sidebarLinks[currentLink.index - 1];
    push(`/courses/take/${courseId}/lessons/${previousLink.id}`);
  };

  const [endLesson, setEndLesson] = useState({
    success: false,
    loading: false,
    error: null,
  });

  const handleEndLesson = async () => {
    if (!lessonDetails.data?.hasEnded) {
      setEndLesson({ loading: true });

      try {
        await requestEndLesson(lessonId);
        handleDelete(lessonId);
        setEndLesson({ success: true });
      } catch (err) {
        setEndLesson({ error: err.message });
      }
    } else {
      setEndLesson({ success: true });
    }
  };

  const handleCompleteAndContinue = async () => {
    await handleEndLesson();
  };
  const handleContinueToNextLesson = useCallback(() => {
    const nextLink = sidebarLinks[currentLink.index + 1];

    if (nextLink.type !== "assessment") {
      push(`/courses/take/${courseId}/lessons/${nextLink.id}`);
    } else {
      push(`/courses/take/${courseId}/assessment`);
    }
  }, [currentLink?.index, courseId, sidebarLinks, push]);

  const endLessonIsSuccessful = endLesson.success;
  const endLessonIsLoading = endLesson.loading;
  const endLessonHasError = endLesson.error;

  const isLastEnabledLesson =
    currentLink?.index ===
    // sidebarLinks?.filter((link) => !link.disabled).length - 1; // TODO: `- 1` redo or remove
    sidebarLinks?.filter((link) => !link.disabled).length - 2; // TODO: `- 2` redo or remove

  useEffect(() => {
    if (endLessonIsSuccessful && !isLastEnabledLesson) {
      handleContinueToNextLesson();
      setEndLesson({ success: false });
    }
  }, [endLessonIsSuccessful, handleContinueToNextLesson]);

  const fetcher = useCallback(async () => {
    const { lesson } = await requestLessonDetails(lessonId);
    return lesson;
  }, [lessonId]);
  const fetchLessonDetails = useCallback(async () => {
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
    fetchLessonDetails();
  }, [fetchLessonDetails]);

  const lesson = lessonDetails.data;
  const isLoading = lessonDetails.loading;
  const error = lessonDetails.err;
  const previousIsDisabled = isLoading || currentLink?.index <= 0;

  const completeAndContinueIsDisabled = lesson?.hasEnded
    ? false
    : isLoading || !videoPlayerManager.videoHasBeenCompleted;

  return {
    lesson,
    isLoading,
    error,
    previousIsDisabled,
    completeAndContinueIsDisabled,
    handlePrevious,
    handleCompleteAndContinue,
    endLessonIsSuccessful,
    endLessonIsLoading,
    endLessonHasError,
    ...videoPlayerManager,
  };
};

export default useLessonDetails;
