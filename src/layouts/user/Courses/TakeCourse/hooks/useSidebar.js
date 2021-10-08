import { useApp, useTakeCourse } from "../../../../../contexts";

const mapLessonsToLinks = (course, getLessonTypeName) => {
  const reduceToLinks = (arrayKey, mapper) =>
    course?.[arrayKey]?.reduce((accumulator, item, index) => {
      const link = mapper(item, index);
      accumulator.push(link);
      return accumulator;
    }, []);

  const mapLessonToLink = (lesson) => ({
    id: lesson.id,
    to: `/courses/take/${course.id}/lessons/${lesson.id}`,
    text: lesson.title,
    disabled: lesson.disabled,
    type: getLessonTypeName(lesson.lessonTypeId),
  });
  const mapAssessmentToLink = (assessment, index) => ({
    id: assessment.id,
    to: `/courses/take/${course.id}/assessment/${assessment.id}`,
    text: `Assessment ${index + 1}`,
    disabled: assessment.disabled,
    type: "assessment",
  });

  const links =
    course?.lessons && course?.assessments
      ? [
          ...reduceToLinks("lessons", mapLessonToLink),
          ...reduceToLinks("assessments", mapAssessmentToLink),
        ]
      : [];

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
