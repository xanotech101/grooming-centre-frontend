import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../components/admin/layouts/AdminLayout";
import { UserLayoutRoute } from "../components/user/layout/UserLayout";

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
