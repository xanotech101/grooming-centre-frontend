import Papa from "papaparse"
import { Grid, GridItem, Stack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Route, useParams, useHistory } from 'react-router-dom';
import { Input, Select, Breadcrumb, Link, Upload } from '../../../../components';
import { useApp, useCache } from '../../../../contexts';
import { CreatePageLayout } from '../../../../layouts';
import { useUpload } from '../../../../hooks';
import {
  adminEditUser,
  adminInviteUser,
  superAdminInviteAdmin,
} from '../../../../services';
import { capitalizeFirstLetter } from '../../../../utils/formatString';
import useCreateUser from '../hooks/useCreateUser';
import { BreadcrumbItem, Box } from '@chakra-ui/react';
import { populateSelectOptions } from '../../../../utils';
import { useEffect, useMemo } from 'react';
import { useViewUserDetails } from '../..';

const CreateUserPage = ({
  creatorRoleIsSuperAdmin,
  metadata: propMetadata,
}) => {
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
  const isEditMode = useMemo(() => userId && userId !== 'new', [userId]);

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
            roleId: data.roleId,
          })
        : creatorRoleIsSuperAdmin &&
          appManager.getOneMetadata('userRoles', data.roleId)?.name === 'admin'
        ? superAdminInviteAdmin(data)
        : adminInviteUser(data));

      if (isEditMode) handleDelete(user.id);

      setStatus({
        success: message,
      });

      toast({
        description: capitalizeFirstLetter(message),
        position: 'top',
        status: 'success',
      });
      reset();
      handleResetDepartmentIsRequired();

      isEditMode && push(`/admin/users/details/${userId}/profile`);
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: 'top',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue('lastName', user.lastName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue('email', user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setValue('gender', user.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && metadata?.departments) {
      setValue('departmentId', user.departmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, metadata?.departments]);

  useEffect(() => {
    if (user && metadata?.userRoles) {
      setValue('roleId', user.userRoleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, metadata?.userRoles]);

  const userRole = appManager.getOneMetadata(
    'userRoles',
    user?.userRoleId
  )?.name;

  // Handle form submission
  const onSubmitBatchUser = async (e) => {
    e.preventDefault();
    try {
      const file = fileManager.handleGetFileAndValidate(
        "File"
      );

      // console.log(file)

      Papa.parse(file, {
        complete: function(results) {
          // console.log("Finished:", results.data);
        }}
      )
      // toast({
      //   description: capitalizeFirstLetter(message),
      //   position: "top",
      //   status: "success",
      // });

      // push(`/admin/courses/${courseId}/lesson/${lesson.id}/view`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  const setLessonAccept = (fileType) => {
    fileManager.handleAcceptChange(fileType)
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
        submitButtonText={isEditMode ? 'Update User' : 'Submit'}
        submitButtonIsLoading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={10} marginBottom={10}>
          <Box
            as="div"
            display={{ lg: 'grid', base: 'flex', md: 'flex' }}
            flexDirection={{ base: 'column', md: 'column' }}
            gridTemplateColumns="1fr 1fr"
            gap={10}
            marginBottom={10}
          >
            <Input
              label="Firstname"
              id="firstName"
              isRequired
              {...register('firstName', {
                required: 'Firstname is required',
              })}
              error={errors.firstName?.message}
            />
            <Input
              label="Lastname"
              id="lastName"
              isRequired
              {...register('lastName', {
                required: 'Lastname is required',
              })}
              error={errors.lastName?.message}
            />
            <Input
              label="User's Email"
              id="email"
              disabled={isEditMode}
              isRequired
              {...register('email', {
                required: "Email can't be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Enter a valid e-mail address',
                },
              })}
              error={errors.email?.message}
            />
            <Select
              id="gender"
              label="Select Gender"
              isRequired
              options={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' },
              ]}
              {...register('gender', {
                required: 'Please select your gender',
              })}
              error={errors.gender?.message}
            />
            <Select
              label="Department"
              options={populateSelectOptions(metadata?.departments)}
              id="departmentId"
              isLoading={!metadata?.departments}
              isRequired={departmentIsRequired}
              {...register('departmentId', {
                required: departmentIsRequired && 'Please select a department',
              })}
              error={errors.departmentId?.message}
            />
            {!userRole?.toLowerCase().includes('super') && (
              <Select
                label="Select Role"
                options={populateSelectOptions(metadata?.userRoles, (r) => {
                  const role = appManager.getOneMetadata(
                    'userRoles',
                    r.id
                  )?.name;

                  if (role !== 'super admin') {
                    return true;
                  }

                  if (!creatorRoleIsSuperAdmin && role !== 'admin') {
                    return true;
                  }
                })}
                isLoading={!metadata?.userRoles}
                isRequired
                {...register('roleId', {
                  required: 'Please select a role',
                })}
                id="roleId"
                error={errors.roleId?.message}
              />
            )}
          </Box>
        </Stack>
      </CreatePageLayout>
      { !isEditMode &&
        <CreatePageLayout
          title="Batch User Upload"
          submitButtonText='Upload'
          submitButtonIsLoading={isSubmitting}
          onSubmit={onSubmitBatchUser}
        >
          <Grid spacing={10} marginBottom={10}>
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
      }
    </>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  const { state, getOneMetadata } = useApp();

  const creatorRoleIsSuperAdmin =
    getOneMetadata('userRoles', state.user?.userRoleId)?.name === 'super admin';

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
