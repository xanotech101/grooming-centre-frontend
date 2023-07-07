import { Box } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import BadgesPageRoute from "../pages/BadgesPage";
import CertificatePageRoute from "../pages/CertificatePage";
import CoursesPageRoute from "../pages/CoursesPage";
import GradeHistoryPageRoute from "../pages/GradeHistoryPage";
import ProfilePageRoute from "../pages/ProfilePage";
import { UserCertificatePageRoute } from "../../../../user/Certificate/userCertificate";

const MainArea = () => {
  return (
    <Box flex={1} overflowY="scroll">
      <Switch>
        <ProfilePageRoute path="/admin/users/details/:id/profile" />
        <UserCertificatePageRoute path="/admin/users/details/:course_id/certificate/:id" />
        <CoursesPageRoute path="/admin/users/details/:id/courses" />
        <BadgesPageRoute path="/admin/users/details/:id/badges" />
        <GradeHistoryPageRoute path="/admin/users/details/:id/grade-history" />
      </Switch>
    </Box>
  );
};

export default MainArea;
