import PropTypes from "prop-types";
import { useEffect } from "react";
import { Prompt } from "react-router-dom";

export const NavigationBlocker = (props) => {
  useEffect(() => {
    if (props.navigationBlocked) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [props.navigationBlocked]);

  return (
    <Prompt
      when={props.navigationBlocked}
      message="Are you sure you want to leave?"
    />
  );
};

NavigationBlocker.propTypes = {
  navigationBlocked: PropTypes.bool.isRequired,
};
