import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTakeCourse } from "../../../../../contexts";

const getLesson = (data, id) => {
  const lesson = data.lessons.find((lesson) => lesson.id === id);
  return lesson;
};

/**
 * Lesson state `Manager`
 * @returns Object { lesson: `Object` | `null`, isLoading: `boolean` }
 */
const useLessonDetails = () => {
  const { lesson_id: lessonId } = useParams();
  const takeCourseManger = useTakeCourse();
  const { state } = takeCourseManger;

  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    if (state.data) {
      const lesson = getLesson(state.data, lessonId);
      setLesson(lesson);
    }
  }, [state?.data, lessonId]);

  const isLoading = state.isLoading;

  return {
    lesson,
    isLoading,
  };
};

export default useLessonDetails;
