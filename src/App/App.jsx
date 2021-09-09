import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../layouts/admin";
import { UserLayoutRoute } from "../layouts/user";
import Providers from "./Providers";
import "../styles/globalStyles.css";
import { Route } from "react-router-dom";

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
