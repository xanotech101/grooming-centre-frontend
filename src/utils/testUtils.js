import { render as rtl } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

/**
 * Mount component to the DOM for testing purposes and unmount after each test case runs.
 *
 * @param {*} Component
 * @param {{ props: {}, wrapWithRouter: boolean } }} options
 */
export const render = (Component, { props, wrapWithRouter }) => {
  const history = createMemoryHistory();
  const component = <Component {...props} />;

  rtl(
    wrapWithRouter ? <Router history={history}>{component}</Router> : component
  );
};
