import { render, screen } from "@testing-library/react";
import UserListingPage from "./UserListingPage";

describe("UserListingPage", () => {
  beforeEach(() => render(<UserListingPage />));

  it("renders the heading of page", () => {
    expect(
      screen.getByRole("heading", { name: /manage users/i })
    ).toBeInTheDocument();
  });

  it("renders the `add users` button", () => {
    expect(
      screen.getByRole("button", { name: /add user/i })
    ).toBeInTheDocument();
  });
});
