import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { AppProvider } from "../../../../contexts";
import mockServer from "../../../../mocks/server/test-env/server";
import CreateUserPage from "./CreateUserPage";

const mockValues = {
  email: "testing-form@gmail.com",
  roleId: "54b0c3c2-08ac-4d6e-a521-2ba7ff9cbfdc",
  departmentId: "73e2b055-039d-4d38-a1b9-e27351719c98",
};

const mockMetadata = {
  userRoles: [
    {
      id: "54b0c3c2-08ac-4d6e-a521-2ba7ff9cbfdc",
      name: "admin",
      createdAt: "2021-09-23T13:55:50.066Z",
      updatedAt: "2021-09-23T13:55:50.066Z",
    },
  ],
  departments: [
    {
      id: "73e2b055-039d-4d38-a1b9-e27351719c98",
      name: "Accounting",
      active: true,
      createdAt: "2021-09-23T13:55:50.994Z",
      updatedAt: "2021-09-23T13:55:50.994Z",
    },
  ],
};

const setupRender = (creatorRoleIsSuperAdmin) =>
  render(
    <AppProvider>
      <CreateUserPage
        creatorRoleIsSuperAdmin={creatorRoleIsSuperAdmin}
        metadata={mockMetadata}
      />
    </AppProvider>
  );

describe("CreateUserPage", () => {
  beforeAll(() => mockServer.listen());
  beforeEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());

  it("Admin invites a User", async () => {
    setupRender();

    // wait for Metadata to load
    // await screen.findByText("fetched metadata");

    const emailInput = screen.getByLabelText(/email/i);
    const departmentSelectInput = screen.getByLabelText(/department/i);
    const roleSelectInput = screen.getByLabelText(/select role/i);

    user.selectOptions(roleSelectInput, mockValues.roleId);
    user.selectOptions(departmentSelectInput, mockValues.departmentId);
    user.type(emailInput, `${mockValues.email} {enter}`);

    expect(screen.getAllByText(/loading/i).length).toBe(1);
    expect(
      await screen.findByText(/user invited successfully/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByText(/loading/i).length).toBe(0);
  });
});
