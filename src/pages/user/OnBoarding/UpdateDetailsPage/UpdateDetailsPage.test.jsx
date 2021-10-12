import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { render } from "../../../../utils";
import UpdateDetailsPage from "./UpdateDetailsPage";

describe("UpdateDetailsPage", () => {
  it("handles input validation", async () => {
    render(UpdateDetailsPage, { wrapWithRouter: true });

    const submitButton = screen.getByTestId("submit");
    user.click(submitButton);

    let errorMessages = await screen.findAllByText(/is required/i);
    expect(errorMessages.length).toBe(5);
  });
});
