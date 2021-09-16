import { BrowserRouter as Router, Switch } from "react-router-dom";
import Providers from "./Providers";
import "../styles/course-box-card.scss";
import "../styles/courses-row-layout.scss";
import "../styles/globalStyles.scss";
import "../styles/react-router-dom-link.scss";
import {
  AdminLayoutRoute,
  TakeCourseLayoutRoute,
  UserLayoutRoute,
} from "../layouts";

function App() {
  return (
    <Providers>
      <Router>
        <Switch>
          <AdminLayoutRoute path="/admin" />
          <TakeCourseLayoutRoute path="/course/take" />
          <UserLayoutRoute path="/" />
        </Switch>
      </Router>
    </Providers>
  );
}

export default App;
