import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import mockServer from "../../../../mocks/server/test-env/server";
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

  it("User Can Request for a new password", async () => {
    expect(
      screen.queryByLabelText(
        /password reset link has been sent to your email/i
      )
    ).not.toBeInTheDocument();

    user.type(screen.getByLabelText(/email/i), "test@email.com {enter}");

    expect(
      await screen.findByText(
        /password reset link has been sent to your email/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /back to sign in/ })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });

  it("handles error correctly", async () => {
    // mockServer.use()
    // user.type(screen.getByLabelText(/email/i), "test@email.com {enter}");
    // expect(await screen.findByLabelText(/error/i)).not.toBeInTheDocument();
    // expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
