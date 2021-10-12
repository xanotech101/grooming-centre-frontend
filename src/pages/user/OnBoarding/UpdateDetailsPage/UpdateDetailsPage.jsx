import { useToast } from "@chakra-ui/toast";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Text, Heading, Input, Button } from "../../../../components";
import { requestUpdateDetails } from "../../../../services";
import { useApp } from "../../../../contexts";
import { useHistory } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import breakpoints from "../../../../theme/breakpoints";

const UpdateDetailsPage = () => {
  // usePageRefreshAfterLogin(); //TODO: uncomment
  // useIsAuthRedirect(); //TODO: uncomment

  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const values = getValues();

  const { handleLogout } = useApp();
  const { replace } = useHistory();

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords must match");
      }

      const body = { password: data.password };

      const { message } = await requestUpdateDetails(body);
      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      handleLogout();
      reset();

      replace("/auth/signin");
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      overflowY="auto"
      justifyContent="center"
      backgroundColor="white"
      zIndex={1}
      padding={10}
    >
      <Box
        width="100%"
        maxWidth={breakpoints.tablet}
        marginX="auto"
        paddingY={5}
      >
        <Box
          as="header"
          padding={10}
          marginBottom={8}
          width="100%"
          shadow="0px 2px 7px rgba(0, 0, 0, 0.1)"
        >
          <Heading marginBottom={5} as="h1" fontSize="heading.h3">
            Welcome Onboard
          </Heading>

          <Text>Kindly update your personal details</Text>
        </Box>

        <Box
          as="main"
          padding={10}
          width="100%"
          shadow="0px 2px 7px rgba(0, 0, 0, 0.1)"
        >
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
              <GridItem colSpan={2}>
                <Heading marginBottom={5} fontSize="heading.h4">
                  Profile
                </Heading>
                <Text>
                  This information will be displayed publicly, so be careful
                  what you share
                </Text>
              </GridItem>

              <Input
                id="firstName"
                label="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              <Input
                id="lastName"
                label="Last Name"
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
              {/* empty column */}
              <Box></Box>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
              <GridItem colSpan={2}>
                <Heading marginBottom={5} fontSize="heading.h4">
                  Personal Information
                </Heading>
                <Text>
                  This information is private and will be used in the recovery
                  of your account
                </Text>
              </GridItem>

              <Input
                id="email"
                label="Email Address"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <Input
                id="phone"
                label="Phone Number"
                type="number"
                {...register("phone", {
                  required: "Phone Number is required",
                })}
              />
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
              <GridItem colSpan={2}>
                <Heading marginBottom={5} fontSize="heading.h4">
                  Security
                </Heading>
                <Text>Kindly set a new password for your account</Text>
              </GridItem>

              <Input
                error="sds"
                id="password"
                label="New Password"
                type="password"
                {...register("password", {
                  required: "New Password is required",
                })}
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
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
        </Box>
      </Box>
    </Box>
  );
};

export const UpdateDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <UpdateDetailsPage {...props} />} />
  );
};

export default UpdateDetailsPage;
