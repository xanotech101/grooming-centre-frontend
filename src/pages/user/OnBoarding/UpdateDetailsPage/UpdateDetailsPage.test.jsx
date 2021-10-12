import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { render } from "../../../../utils";
import UpdateDetailsPage from "./UpdateDetailsPage";

describe("UpdateDetailsPage", () => {
  it("handles input validation", () => {
    render(UpdateDetailsPage, { wrapWithRouter: true });

    const submitButton = screen.getByTestId("submit");
    user.click(submitButton);

    let errorMessages = screen.getAllByText(/is required/i);
    expect(errorMessages.length).toBe(5);
  });
});
