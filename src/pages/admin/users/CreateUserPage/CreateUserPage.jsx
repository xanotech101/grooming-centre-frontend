import { useState } from "react";
import { Grid, GridItem, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Route, useParams, useHistory } from "react-router-dom";
import { read, utils } from "xlsx";
import {
  Input,
  Select,
  Breadcrumb,
  Link,
  Upload,
} from "../../../../components";
import { useApp, useCache } from "../../../../contexts";
import { CreatePageLayout } from "../../../../layouts";
import { useUpload } from "../../../../hooks";
import {
  adminEditUser,
  adminInviteUser,
  adminInvitBatcheUser,
  superAdminInviteAdmin,
} from "../../../../services";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import useCreateUser from "../hooks/useCreateUser";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { populateSelectOptions } from "../../../../utils";
import { useEffect, useMemo } from "react";
import { useViewUserDetails } from "../..";

const CreateUserPage = ({
  creatorRoleIsSuperAdmin,
  metadata: propMetadata,
}) => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [uploadingUsers, setUploadingUsers] = useState(false);

  const toast = useToast();
  const appManager = useApp();
  const {
    formManager,
    departmentIsRequired,
    handleResetDepartmentIsRequired,
    setStatus,
    // status,
  } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = formManager;

  const { push } = useHistory();

  const { id: userId } = useParams();
  const isEditMode = useMemo(() => userId && userId !== "new", [userId]);

  const { user } = useViewUserDetails();

  const metadata = propMetadata || appManager.state.metadata;

  const { handleDelete } = useCache();

  const fileManager = useUpload();

  const onSubmit = async (data) => {
    try {
      const { message, user } = await (isEditMode
        ? adminEditUser(userId, {
            departmentId: data.departmentId,
            firstName: data.firstName,
            gender: data.gender,
            lastName: data.lastName,
            userRoleId: data.roleId,
          })
        : creatorRoleIsSuperAdmin &&
          appManager.getOneMetadata("userRoles", data.roleId)?.name === "admin"
        ? superAdminInviteAdmin(data)
        : adminInviteUser(data));

      if (isEditMode) handleDelete(user.id);

      setStatus({
        success: message,
      });

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      reset();
      handleResetDepartmentIsRequired();

      isEditMode && push(`/admin/users/details/${userId}/profile`);
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue("lastName", user.lastName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue("email", user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue("gender", user.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && metadata?.departments) {
      setValue("departmentId", user.departmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, metadata?.departments]);

  useEffect(() => {
    if (user && metadata?.userRoles) {
      setValue("roleId", user.userRoleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, metadata?.userRoles]);

  const userRole = appManager.getOneMetadata(
    "userRoles",
    user?.userRoleId
  )?.name;

  // Handle form submission
  const onSubmitBatchUser = async (e) => {
    e.preventDefault();
    try {
      if (!selectedDepartmentId) {
        throw new Error("Please select a department");
      }

      const file = fileManager.handleGetFileAndValidate("File");

      setUploadingUsers(true);

      const getJson = () => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsBinaryString(file);
          fileReader.onload = (e) => {
            const data = e.target.result;
            const wb = read(data, { type: "binary" });
            const rowObj = utils.sheet_to_row_object_array(
              wb.Sheets[wb.SheetNames[0]]
            );

            const updatedRowObj = rowObj.map((obj) => {
              const updatedObj = {};
              for (const [key, value] of Object.entries(obj)) {
                updatedObj[key] = value.toLowerCase();
              }
              return updatedObj;
            });

            resolve(JSON.stringify(updatedRowObj));
          };
        });
      };

      const jsonObj = await getJson();
      console.log(JSON.parse(jsonObj));
      const { message } = await adminInvitBatcheUser({
        departmentId: selectedDepartmentId,
        users: JSON.parse(jsonObj),
      });

      setUploadingUsers(false);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      push(`/admin/users`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });

      setUploadingUsers(false);
    }
  };
  console.log(selectedDepartmentId, "hello");
  const setLessonAccept = (fileType) => {
    fileManager.handleAcceptChange(fileType);
  };

  // Init `lessonTypeId` value and set `accept` for file upload input
  useEffect(() => {
    setLessonAccept(".csv, .xlsx, .xls");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/users">Users</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Create Users</Link>
            </BreadcrumbItem>
          }
        />
      </Box>
      <CreatePageLayout
        title="Create Single User"
        submitButtonText={isEditMode ? "Update User" : "Submit"}
        submitButtonIsLoading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={10} marginBottom={10}>
          <Box
            as="div"
            display={{ lg: "grid", base: "flex", md: "flex" }}
            flexDirection={{ base: "column", md: "column" }}
            gridTemplateColumns="1fr 1fr"
            gap={10}
            marginBottom={10}
          >
            <Input
              label="Firstname"
              id="firstName"
              isRequired
              {...register("firstName", {
                required: "Firstname is required",
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Lastname"
              id="lastName"
              isRequired
              {...register("lastName", {
                required: "Lastname is required",
              })}
              error={errors.lastName?.message}
            />
            <Input
              label="User's Email"
              id="email"
              disabled={isEditMode}
              isRequired
              {...register("email", {
                required: "Email can't be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid e-mail address",
                },
              })}
              error={errors.email?.message}
            />
            <Select
              id="gender"
              label="Select Gender"
              isRequired
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
              ]}
              {...register("gender", {
                required: "Please select your gender",
              })}
              error={errors.gender?.message}
            />
            <Select
              label="Department"
              options={populateSelectOptions(metadata?.departments)}
              id="departmentId"
              isLoading={!metadata?.departments}
              isRequired={departmentIsRequired}
              {...register("departmentId", {
                required: departmentIsRequired && "Please select a department",
              })}
              error={errors.departmentId?.message}
            />
            {!userRole?.toLowerCase().includes("super") && (
              <Select
                label="Select Role"
                options={populateSelectOptions(metadata?.userRoles, (r) => {
                  const role = appManager.getOneMetadata(
                    "userRoles",
                    r.id
                  )?.name;

                  if (role !== "super admin") {
                    return true;
                  }

                  if (!creatorRoleIsSuperAdmin && role !== "admin") {
                    return true;
                  }
                })}
                isLoading={!metadata?.userRoles}
                isRequired
                {...register("roleId", {
                  required: "Please select a role",
                })}
                id="roleId"
                error={errors.roleId?.message}
              />
            )}
          </Box>
        </Stack>
      </CreatePageLayout>
      {!isEditMode && (
        <CreatePageLayout
          title="Batch User Upload"
          submitButtonText="Upload"
          submitButtonIsLoading={uploadingUsers}
          onSubmit={onSubmitBatchUser}
        >
          <Grid spacing={10} marginBottom={10}>
            <GridItem marginBottom={10}>
              <Select
                error={errors.departmentId?.message}
                isRequired
                label="Select department"
                options={populateSelectOptions(metadata?.departments)}
                id="departmentId"
                isLoading={!metadata?.departments}
                value={selectedDepartmentId}
                onChange={(e) => setSelectedDepartmentId(e.target.value)}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <Upload
                id="file"
                previewElementId="file-video"
                label="File (.csv, .xlsx, .xls)"
                isRequired
                excelUrl={fileManager.excel.url}
                onFileSelect={fileManager.handleFileSelect}
                accept={fileManager.accept}
              />
            </GridItem>
          </Grid>
        </CreatePageLayout>
      )}
    </>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  const { state, getOneMetadata } = useApp();

  const creatorRoleIsSuperAdmin =
    getOneMetadata("userRoles", state.user?.userRoleId)?.name === "super admin";

  return (
    <Route
      {...rest}
      render={(props) => (
        <CreateUserPage
          creatorRoleIsSuperAdmin={creatorRoleIsSuperAdmin}
          {...props}
        />
      )}
    />
  );
};

export default CreateUserPage;
