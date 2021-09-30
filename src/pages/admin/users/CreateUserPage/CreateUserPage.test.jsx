import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import CreateUserPage from "./CreateUserPage";

const setupRender = (creatorRoleIsSuperAdmin) =>
  render(<CreateUserPage creatorRoleIsSuperAdmin={creatorRoleIsSuperAdmin} />);

const mockValues = {
  email: "test@gmail.com",
  firstName: "tobby",
  lastName: "paul",
};

describe("CreateUserPage", () => {
  it("Admin invites a User", () => {
    setupRender();
  });
});
