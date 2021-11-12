import { Route } from "react-router-dom";

const EventsPage = () => {
  return "EventsPage";
};

export const EventsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <EventsPage {...props} />} />;
};
