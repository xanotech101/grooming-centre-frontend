import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../layouts/admin";
import { UserLayoutRoute } from "../layouts/user";

function App() {
  return (
    <Router>
      <Switch>
        <AdminLayoutRoute path="/admin" />
        <UserLayoutRoute path="/" />
      </Switch>
    </Router>
  );
}

export default App;
