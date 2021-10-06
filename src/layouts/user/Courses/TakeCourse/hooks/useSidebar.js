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
  const appManager = useApp();
  const takeCourseManger = useTakeCourse();

  const getLessonTypeName = (id) =>
    appManager.getOneMetadata("lessonType", id)?.name;

  const [links, setLinks] = useState(null);

  useEffect(() => {
    if (takeCourseManger.state.data && appManager.state.metadata) {
      const links = mapLessonsToLinks(
        takeCourseManger.state.data,
        getLessonTypeName
      );
      setLinks(links);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takeCourseManger.state.data, appManager.state.metadata]);

  const course = takeCourseManger.state.data;
  const isLoading = takeCourseManger.state.isLoading;

  return {
    course,
    links,
    isLoading,
  };
};

export default useSidebar;
