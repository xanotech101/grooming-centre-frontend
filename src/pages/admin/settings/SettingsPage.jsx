import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Route, useHistory } from "react-router-dom";
import {
  Button,
  Heading,
  Input,
  PasswordInput,
  PhoneNumberInput,
  Select,
  Text,
  Upload,
} from "../../../components";
import { useApp } from "../../../contexts";
import { useUpload } from "../../../hooks";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";
import { requestUpdateDetails } from "../../../services";
import { appendFormData, capitalizeFirstLetter } from "../../../utils";

const AccountPage = () => {
  const {
    state: { user },
  } = useApp();

  const toast = useToast();
  const thumbnailUpload = useUpload();
  const { replace } = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const values = getValues();

  const onSubmit = async (data) => {
    try {
      const profilePicture =
        thumbnailUpload.handleGetFileAndValidate("Profile Picture");

      data = {
        ...data,
        profilePicture,
      };
      const body = appendFormData(data);

      const { message } = await requestUpdateDetails(body);
      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      reset();

      replace("/admin");
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
      setValue("gender", user.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      thumbnailUpload.handleInitialImageSelect(user.profilePics);
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
      setValue("phone", user.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AdminMainAreaWrapper>
      <Box as="form" paddingY={8} onSubmit={handleSubmit(onSubmit)}>
        <Heading fontSize="heading.h3" paddingBottom={4}>
          Account
        </Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={6}>
          <GridItem colSpan={2}>
            <Heading marginBottom={4} fontSize="heading.h4">
              Profile
            </Heading>
            <Text>
              This information will be displayed publicly, so be careful what
              you share
            </Text>
          </GridItem>

          <Input
            data-testid="input"
            id="firstName"
            error={errors.firstName?.message}
            label="First Name"
            isRequired
            {...register("firstName", {
              required: "Firstname is required",
            })}
          />
          <Input
            data-testid="input"
            id="lastName"
            error={errors.lastName?.message}
            label="Last Name"
            isRequired
            {...register("lastName", {
              required: "Lastname is required",
            })}
          />
          <Select
            id="gender"
            label="Gender"
            isRequired
            width="100%"
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
            ]}
            {...register("gender", {
              required: "Please select your gender",
            })}
            error={errors.gender?.message}
          />
        </Grid>

        <Box marginBottom={6}>
          <Upload
            isMini
            isRequired
            id="profilePics"
            label="Profile Picture"
            onFileSelect={thumbnailUpload.handleFileSelect}
            imageUrl={thumbnailUpload.image.url}
            accept={thumbnailUpload.accept}
          />
        </Box>
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={6}>
          <GridItem colSpan={2}>
            <Heading marginBottom={4} fontSize="heading.h4">
              Personal Information
            </Heading>
            <Text>
              This information is private and will be used in the recovery of
              your account
            </Text>
          </GridItem>
          <Input
            data-testid="input"
            id="email"
            error={errors.email?.message}
            label="Email Address"
            type="email"
            isRequired
            {...register("email", {
              required: "Email can't be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
          />
          <PhoneNumberInput
            data-testid="input"
            id="phone"
            error={errors.phone?.message}
            isRequired
            label="Phone Number"
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
            })}
          />
          <PasswordInput
            id="new-password"
            label="New password"
            error={errors.password?.message}
            {...register("password", {
              minLength: {
                value: 3,
                message: "Password should not be less than 3 characters",
              },
            })}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              validate: (value) =>
                value === values.password || "Password must match",
            })}
          />
        </Grid>

        <Flex justifyContent="flex-end">
          <Button secondary marginRight={6} link="/">
            Cancel
          </Button>
          <Button
            type="submit"
            data-testid="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Update
          </Button>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

export const SettingsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AccountPage {...props} />} />;
};
