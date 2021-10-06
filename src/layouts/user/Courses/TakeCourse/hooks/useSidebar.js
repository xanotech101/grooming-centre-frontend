import { useEffect, useState } from "react";
import { useApp, useTakeCourse } from "../../../../../contexts";

const mapLessonsToLinks = (data, getLessonTypeName) => {
  const links = data?.lessons?.reduce((accumulator, lesson, index) => {
    const link = {
      id: lesson.id,
      to: `/courses/take/${data.id}/lessons/${lesson.id}`,
      text: lesson.title,
      disabled: lesson.disabled,
      type: getLessonTypeName(lesson.lessonTypeId),
    };
    accumulator.push(link);

    if (index === data.lessons.length - 1) {
      const link = {
        id: data.assessment.id || Math.random(), // TODO: remove
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
  const { getOneMetadata } = useApp();
  const takeCourseManger = useTakeCourse();
  const { state } = takeCourseManger;

  const getLessonTypeName = (id) => getOneMetadata("lessonType", id)?.name;

  const [links, setLinks] = useState(null);

  useEffect(() => {
    if (state.data) {
      const links = mapLessonsToLinks(state.data, getLessonTypeName);
      setLinks(links);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.data]);

  console.log(state.data);

  const courseTitle = state.data?.title;
  const isLoading = state.isLoading;

  return {
    links,
    courseTitle,
    isLoading,
  };
};

export default useSidebar;
