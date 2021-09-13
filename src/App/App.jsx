import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../layouts/admin";
import { UserLayoutRoute } from "../layouts/user";
import Providers from "./Providers";
import "../styles/course-box-card.scss";
import "../styles/globalStyles.scss";
import "../styles/react-router-dom-link.scss";

function App() {
  return (
    <Providers>
      <Router>
        <Switch>
          <AdminLayoutRoute path="/admin" />
          <UserLayoutRoute path="/" />
        </Switch>
      </Router>
    </Providers>
  );
}

export default App;
