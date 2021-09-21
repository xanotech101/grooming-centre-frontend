import { BrowserRouter as Router, Switch } from "react-router-dom";
import GlobalProviders from "./GlobalProviders";
import "../styles/course-box-card.scss";
import "../styles/courses-row-layout.scss";
import "../styles/globalStyles.scss";
import "../styles/user-header-nav-link.scss";
import {
  AdminLayoutRoute,
  AssessmentLayoutRoute,
  TakeCourseLayoutRoute,
  UserLayoutRoute,
} from "../layouts";
import { useApp } from "../contexts";
import { useEffect } from "react";
import AuthCheckPageRoute from "../pages/global/auth/AuthCheckPage";

function App() {
  return (
    <GlobalProviders>
      <Router>
        <AppConfig />
      </Router>
    </GlobalProviders>
  );
}

const useConfig = () => {
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

    // TODO: remove this check
    if (token) {
      fetchCurrentUser();
    }
  }, [
    fetchMetadata,
    fetchCurrentUser,
    handleGetTokenFromClientStorage,
    handleSetToken,
  ]);
};

const AppConfig = () => {
  useConfig();

  return (
    <Switch>
      <AdminLayoutRoute path="/admin" />
      <AssessmentLayoutRoute path="/courses/take/:course_id/assessment/start" />
      <TakeCourseLayoutRoute path="/courses/take" />
      <AuthCheckPageRoute path="/auth-check" />
      <UserLayoutRoute path="/" />
    </Switch>
  );
};

export default App;
