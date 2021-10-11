// import { useToast } from "@chakra-ui/toast";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  // Brand, Button, Input,
  Text,
  Heading,
  Input,
  Button,
} from "../../../components";
// import { OnBoardingFormLayout } from "../../../layouts";
// import { userCreateNewPassword, userResetPassword } from "../../../services";
// import { useApp } from "../../../contexts";
// import { useHistory } from "react-router-dom";
// import useQueryParams from "../../../hooks/useQueryParams";
// import { capitalizeFirstLetter } from "../../../utils/formatString";
import breakpoints from "../../../theme/breakpoints";

const UpdateDetailsPage = () => {
  // const toast = useToast();
  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors, isSubmitting },
  //   reset,
  // } = useForm();
  // const values = getValues();

  // const { handleLogout } = useApp();
  // const { replace } = useHistory();
  // const queryParams = useQueryParams();

  // const resetToken = queryParams.get("resetToken");

  // const onSubmit = async (data) => {
  //   const handleRequest = (body) =>
  //     resetToken ? userResetPassword(body) : userCreateNewPassword(body);

  //   try {
  //     if (data.password !== data.confirmPassword) {
  //       throw new Error("Passwords must match");
  //     }

  //     const body = { password: data.password };

  //     const { message } = await handleRequest(body);
  //     toast({
  //       description: capitalizeFirstLetter(message),
  //       position: "top",
  //       status: "success",
  //     });
  //     handleLogout();
  //     reset();

  //     replace("/auth/signin");
  //   } catch (err) {
  //     toast({
  //       description: capitalizeFirstLetter(err.message),
  //       position: "top",
  //       status: "error",
  //     });
  //   }
  // };

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
          <Box as="form">
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

              <Input id="firstName" label="First Name" />
              <Input id="lastName" label="Last Name" />

              <Input id="lastName" label="Profile Picture" />
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

              <Input id="email" label="Email Address" type="email" />
              <Input id="phone" label="Phone Number" type="number" />
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
              <GridItem colSpan={2}>
                <Heading marginBottom={5} fontSize="heading.h4">
                  Security
                </Heading>
                <Text>Kindly set a new password for your account</Text>
              </GridItem>

              <Input id="password" label="New Password" type="password" />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </Grid>

            <Flex justifyContent="flex-end">
              <Button secondary marginRight={6} link="/">
                Cancel
              </Button>
              <Button type="submit">Update</Button>
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
