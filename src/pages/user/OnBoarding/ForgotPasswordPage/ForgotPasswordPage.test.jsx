import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ForgotPasswordPage from "./ForgotPasswordPage";

describe("ForgotPasswordPage", () => {
  const history = createMemoryHistory();

  beforeEach(() =>
    render(
      <Router history={history}>
        <ForgotPasswordPage />
      </Router>
    )
  );

  it("User Can Request for a new password", () => {
    user.type(screen.getByLabelText(/email/i), "test@email.com");

    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });
});
