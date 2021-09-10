import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../layouts/admin";
import { UserLayoutRoute } from "../layouts/user";
import Providers from "./Providers";
import "../styles/globalStyles.css";
import "../styles/react-router-dom-link.css";

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
