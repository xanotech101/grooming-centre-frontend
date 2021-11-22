import PropTypes from "prop-types";
import { useEffect } from "react";
import { Prompt } from "react-router-dom";

export const NavigationBlocker = (props) => {
  useEffect(() => {
    if (props.when) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [props.when]);

  return <Prompt when={props.when} message="Are you sure you want to leave?" />;
};

NavigationBlocker.propTypes = {
  when: PropTypes.bool.isRequired,
};
