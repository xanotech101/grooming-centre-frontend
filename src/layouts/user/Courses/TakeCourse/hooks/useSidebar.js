import { useEffect, useState } from "react";
import { useTakeCourse } from "../../../../../contexts";

const mapLessonsToLinks = (data) => {
  const links = data?.lessons.reduce((accumulator, lesson, index) => {
    const link = {
      id: lesson.id,
      to: `/courses/take/${data.id}/lessons/${lesson.id}`,
      text: lesson.title,
      disabled: lesson.disabled,
      type: lesson.lessonType.name,
    };
    accumulator.push(link);

    if (index === data.lessons.length - 1) {
      const link = {
        id: data.assessment.id,
        to: `/courses/take/${data.id}/assessment`,
        text: "Assessment",
        disabled: data.assessment.disabled,
        type: "assessment",
      };
      accumulator.push(link);
    }

    return accumulator;
  }, []);

  return links;
};

/**
 * TakeCourseLayout's Sidebar functionality `Manager`
 * @returns Object { links: `Array<Object>` | `null`, courseTitle: `string`, isLoading: `boolean` }
 */
const useSidebar = () => {
  const takeCourseManger = useTakeCourse();
  const { state } = takeCourseManger;

  const [links, setLinks] = useState(null);

  useEffect(() => {
    if (state.data) {
      const links = mapLessonsToLinks(state.data);
      setLinks(links);
    }
  }, [state?.data]);

  const courseTitle = state.data?.title;
  const isLoading = state.isLoading;

  return {
    links,
    courseTitle,
    isLoading,
  };
};

export default useSidebar;
