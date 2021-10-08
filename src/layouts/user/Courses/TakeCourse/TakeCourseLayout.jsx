import { Route } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { TakeCourseProvider } from "../../../../contexts";
import breakpoints from "../../../../theme/breakpoints";
import Sidebar from "./Sidebar";
import useSidebar from "./hooks/useSidebar";
import { Switch } from "react-router-dom";
import {
  AssessmentPreviewPageRoute,
  LessonDetailsPageRoute,
} from "../../../../pages/user";
import { useIsAuthRedirect } from "../../../../hooks/useAuthCheckRedirect";

const TakeCourseLayout = () => {
  const sidebarManager = useSidebar();
  useIsAuthRedirect();

  return (
    <Flex maxWidth={breakpoints["4k"]} marginX="auto" height="100vh">
      <Sidebar manager={sidebarManager} />

      <Switch>
        <LessonDetailsPageRoute
          path="/courses/take/:course_id/lessons/:lesson_id"
          sidebarLinks={sidebarManager.links}
        />
        <AssessmentPreviewPageRoute
          path="/courses/take/:course_id/assessment/:assessment_id"
          sidebarLinks={sidebarManager.links}
        />
      </Switch>
    </Flex>
  );
};

export const TakeCourseLayoutRoute = ({ ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <TakeCourseProvider>
          <TakeCourseLayout {...props} />
        </TakeCourseProvider>
      )}
    />
  );
};
