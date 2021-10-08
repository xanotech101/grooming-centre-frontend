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

  const index = sidebarLinks?.findIndex((link) => link.id === lessonId);
  const currentLessonLink = { index, ...sidebarLinks?.[index] };

  const handlePrevious = () => {
    const previousLink = sidebarLinks[currentLessonLink.index - 1];
    push(`/courses/take/${courseId}/lessons/${previousLink.id}`);
  };

  const [endLesson, setEndLesson] = useState({
    success: false,
    loading: false,
    error: null,
  });

  const handleEndLesson = async () => {
    if (!lessonDetails.data?.hasEnded) {
      console.log("end the lesson");

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
    const nextLink = sidebarLinks[currentLessonLink.index + 1];

    if (nextLink.type !== "assessment") {
      push(`/courses/take/${courseId}/lessons/${nextLink.id}`);
    } else {
      push(`/courses/take/${courseId}/assessment`);
    }
  }, [currentLessonLink?.index, courseId, sidebarLinks, push]);

  const endLessonIsSuccessful = endLesson.success;
  const endLessonIsLoading = endLesson.loading;
  const endLessonHasError = endLesson.error;

  // const isLastEnabledLesson =
  //   currentLink?.index ===
  //   // sidebarLinks?.filter((link) => !link.disabled).length - 1; // TODO: `- 1` redo or remove
  //   sidebarLinks?.filter((link) => !link.disabled).length - 2; // TODO: `- 2` redo or remove

  const nextLessonIsDisabled =
    sidebarLinks?.[currentLessonLink?.index + 1]?.disabled;

  useEffect(() => {
    // if (endLessonIsSuccessful && !nextLessonIsDisabled) {
    if (endLessonIsSuccessful) {
      if (!nextLessonIsDisabled) {
        handleContinueToNextLesson();
      }
      setEndLesson({ success: false });
    }
  }, [nextLessonIsDisabled, endLessonIsSuccessful, handleContinueToNextLesson]);

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
    fetchLessonDetails();
  }, [fetchLessonDetails]);

  const lesson = lessonDetails.data;
  const isLoading = lessonDetails.loading;
  const error = lessonDetails.err;
  const previousIsDisabled = isLoading || currentLessonLink?.index <= 0;

  const getCompleteAndContinueIsDisabled = () => {
    if (isLoading) return true;
    if (lesson?.hasEnded) return false;
    if (videoPlayerManager.videoHasBeenCompleted) return false;

    return true;
  };

  const completeAndContinueIsDisabled = getCompleteAndContinueIsDisabled();

  // lesson?.hasEnded
  // ? false
  // : isLoading || !videoPlayerManager.videoHasBeenCompleted;

  console.log({
    completeAndContinueIsDisabled,
    nextLessonIsDisabled,
    endLessonIsSuccessful,
    isLoading,
    videoPlayerManager: videoPlayerManager.videoHasBeenCompleted,
  });

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
