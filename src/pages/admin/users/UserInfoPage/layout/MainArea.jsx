import { Switch } from "react-router-dom";
import BadgesPageRoute from "../pages/Badges";
import CertificatePageRoute from "../pages/Certificate";
import CoursesPageRoute from "../pages/Courses";
import GradeHistoryPageRoute from "../pages/GradeHistory";
import ProfilePageRoute from "../pages/ProfilePage";

const MainArea = () => {
  return (
    <Switch>
      <ProfilePageRoute path="/admin/users/:id/profile" />
      <CertificatePageRoute path="/admin/users/:id/certificate" />
      <CoursesPageRoute path="/admin/users/:id/courses" />
      <BadgesPageRoute path="/admin/users/:id/badges" />
      <GradeHistoryPageRoute path="/admin/users/:id/grade-history" />
    </Switch>
  );
};

export default MainArea;
