import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { render } from "../../../../utils";
import UpdateDetailsPage from "./UpdateDetailsPage";

describe("UpdateDetailsPage", () => {
  it("handles input validation", () => {
    render(UpdateDetailsPage, { wrapWithRouter: true });

    const submitButton = screen.getByText(/update/i);
    user.click(submitButton);

    let errorMessages = screen.getByAllText(/is required/i);

    expect(errorMessages.length).toBe(5);
  });
});
