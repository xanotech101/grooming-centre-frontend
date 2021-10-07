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
  const {
    state: { data: course, isLoading },
  } = useTakeCourse();

  const getLessonTypeName = (id) =>
    appManager.getOneMetadata("lessonType", id)?.name;
  const links = mapLessonsToLinks(course, getLessonTypeName);

  const loading = isLoading || !appManager.state.metadata; // TODO:replace with `!appManager.metadataIsLoading`

  return {
    course,
    links,
    isLoading: loading,
  };
};

export default useSidebar;
