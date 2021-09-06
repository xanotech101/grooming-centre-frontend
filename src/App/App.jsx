import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AdminLayoutRoute } from "../layouts/admin/AdminLayout";

function App() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/">
          <Redirect to="/layout1" />
        </Route> */}
        <AdminLayoutRoute exact path="/admin" component={AdminLayoutRoute} />
      </Switch>
    </Router>
  );
}

export default App;
