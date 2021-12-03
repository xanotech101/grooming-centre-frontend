import { useState } from "react";
import { useApp, useTakeCourse } from "../../../../../contexts";
import { hasEnded, isOngoing, isUpcoming } from "../../../../../utils";

const mapLessonsToLinks = (course) => {
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
    disabled:
      !isOngoing(lesson.startTime, lesson.endTime) && !lesson.hasCompleted,
    type: lesson.lessonType.name,
    hasCompleted: lesson.hasCompleted,
    hasElapsed: hasEnded(lesson.endTime) && !lesson.hasCompleted,
    isUpcoming: isUpcoming(lesson.startTime),
  });
  const mapAssessmentToLink = (assessment, index) => ({
    id: assessment.id,
    to: `/courses/take/${course.id}/assessment/${assessment.id}`,
    text: `Assessment ${index + 1}`,
    disabled:
      !isOngoing(assessment.startTime, assessment.endTime) ||
      assessment.hasCompleted,
    type: "assessment",
    hasCompleted: assessment.hasCompleted,
    hasElapsed: hasEnded(assessment.endTime) && !assessment.hasCompleted,
    isUpcoming: isUpcoming(assessment.startTime),
  });

  const links =
    course?.lessons && course?.assessments
      ? [
          ...reduceToLinks("lessons", mapLessonToLink),
          ...reduceToLinks("assessments", mapAssessmentToLink),
        ]
      : [];

  const examination = {
    id: course?.examination?.id,
    to: `/courses/take/${course?.id}/assessment/${course?.id}?examination=true`,
    text: "Examination",
    disabled:
      !isOngoing(
        course?.examination?.startTime,
        course?.examination?.endTime
      ) || course?.examination?.hasCompleted,
    type: "examination",
    hasCompleted: course?.examination?.hasCompleted,
    hasElapsed:
      hasEnded(course?.examination?.endTime) &&
      !course?.examination?.hasCompleted,
    isUpcoming: isUpcoming(course?.examination?.startTime),
  };

  if (course?.examination) links.push(examination);

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
    setState: setCourseState,
  } = useTakeCourse();

  const sidebarLinkClickedState = useState(false);

  const links = mapLessonsToLinks(course);

  const loading = isLoading || !appManager.state.metadata; // TODO:replace with `!appManager.metadataIsLoading`

  return {
    course,
    setCourseState,
    links,
    isLoading: loading,
    sidebarLinkClickedState,
  };
};

export default useSidebar;
