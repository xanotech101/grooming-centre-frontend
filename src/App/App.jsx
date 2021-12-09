import { BrowserRouter as Router, Switch } from "react-router-dom";
import GlobalProviders from "./GlobalProviders";
import "../styles/course-box-card.scss";
import "../styles/courses-row-layout.scss";
import "../styles/globalStyles.scss";
import "../styles/user-header-nav-link.scss";
import "../styles/user-forum-sidebar-link.scss";
import "../styles/take-lesson-video.scss";
import {
  AdminLayoutRoute,
  AssessmentLayoutRoute,
  TakeCourseLayoutRoute,
  UserLayoutRoute,
} from "../layouts";
import { useApp } from "../contexts";
import { useEffect } from "react";

function App() {
  return (
    <GlobalProviders>
      <Router>
        <AppConfig />
      </Router>
    </GlobalProviders>
  );
}
//
export const useAppConfig = () => {
  const appManager = useApp();

  const {
    fetchMetadata,
    fetchCurrentUser,
    handleSetToken,
    handleGetTokenFromClientStorage,
  } = appManager;

  useEffect(() => {
    fetchMetadata();
    const token = handleGetTokenFromClientStorage();
    handleSetToken(token);

    if (token) {
      fetchCurrentUser();
    }
  }, [
    fetchMetadata,
    fetchCurrentUser,
    handleGetTokenFromClientStorage,
    handleSetToken,
  ]);

  useEffect(() => {
    if (appManager.state.user) {
      let DateNow = localStorage.getItem("DateNow");
      // console.log(appManager.state.user);
      if (DateNow)
        setInterval(() => {
          DateNow = +localStorage.getItem("DateNow") + 1000;
          localStorage.setItem("DateNow", DateNow);
        }, 1000);
    }
  }, [appManager.state.user]);
};

const AppConfig = () => {
  useAppConfig();

  return (
    <Switch>
      <AdminLayoutRoute path="/admin" />
      <AssessmentLayoutRoute
        exact
        path="/courses/take/:course_id/assessment/start/:assessment_id"
      />
      <TakeCourseLayoutRoute path="/courses/take" />
      <UserLayoutRoute path="/" />
    </Switch>
  );
};

export default App;
