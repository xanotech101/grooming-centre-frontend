import { Flex } from "@chakra-ui/layout";
import { Route, useParams } from "react-router-dom";
import { Heading, Spinner } from "../../../../../components";
import useAssessmentPreview from "../../../../user/Courses/TakeCourse/hooks/useAssessmentPreview";
import EditAssessmentPage from "./EditAssessmentPage";
import CreateAssessmentPage from "./CreateAssessmentPage";
import { useQueryParams } from "../../../../../hooks";

export const isStandaloneExaminationAndIsNotEditMode =
  "isStandaloneExamination && isNotEdit";

const OverviewPage = () => {
  const { id: courseId, assessmentId } = useParams();
  const examinationId = useQueryParams().get("examination");
  const isStandaloneExamination =
    courseId === "not-set" && assessmentId === "not-set" && examinationId
      ? true
      : false;

  const isEditMode = isStandaloneExamination
    ? examinationId && examinationId !== "new"
    : assessmentId && assessmentId !== "new";

  const { isLoading, error, assessment } = useAssessmentPreview(
    null,
    isStandaloneExamination && !isEditMode
      ? isStandaloneExaminationAndIsNotEditMode
      : isStandaloneExamination && isEditMode
      ? examinationId
      : assessmentId,
    true
  );

  console.log(isEditMode);

  return isEditMode && (isLoading || error) ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Heading color="red.500">{error}</Heading>
      ) : null}
    </Flex>
  ) : isEditMode ? (
    <EditAssessmentPage assessment={assessment} />
  ) : (
    <CreateAssessmentPage />
  );
};

const OverviewPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <OverviewPage {...props} />} />;
};

export default OverviewPageRoute;
