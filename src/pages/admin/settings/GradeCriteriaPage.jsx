import { Box, Flex, Grid, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiCertification } from "react-icons/bi";
import { FiCheckSquare } from "react-icons/fi";
import { ImArrowUp } from "react-icons/im";
import { Route } from "react-router-dom";
import { Button, Heading, Input } from "../../../components";
import { useFetch } from "../../../hooks";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";
import {
  adminEditGradeCriteria,
  adminGetGradeCriteria,
} from "../../../services";
import { appendFormData, capitalizeFirstLetter } from "../../../utils";
import { OverviewBox } from "../users/UserInfoPage/pages/ProfilePage";

const useGradeCriteriaDetails = () => {
  const { resource: gradeCriteria, handleFetchResource } = useFetch();

  const fetcher = useCallback(async () => {
    const { gradeCriteria } = await adminGetGradeCriteria();
    return gradeCriteria;
  }, []);

  // Handle fetch grade criteria
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    gradeCriteria,
  };
};

const GradeCriteriaPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  const { gradeCriteria } = useGradeCriteriaDetails();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const body = appendFormData(data);

      const { message } = await adminEditGradeCriteria(body);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <AdminMainAreaWrapper paddingY={8}>
      <Heading fontSize="heading.h3" marginBottom={4}>
        Grade Criteria
      </Heading>
      <Grid
        templateColumns="repeat(3, minmax(150px, 1fr))"
        gridAutoRows="100px"
        gap={3}
      >
        <OverviewBox
          href="#"
          value={gradeCriteria?.data?.examination}
          name="Exams"
          icon={<ImArrowUp />}
          iconBackgroundColor="accent.6"
        />
        <OverviewBox
          href="#"
          value={gradeCriteria?.data?.assessment}
          name="Assessments"
          icon={<FiCheckSquare />}
          iconBackgroundColor="accent.7"
        />
        <OverviewBox
          href="#"
          value={gradeCriteria?.data?.attendance}
          name="Attendance"
          icon={<BiCertification />}
          iconBackgroundColor="secondary.5"
        />
      </Grid>
      <Heading fontSize="heading.h3" marginTop={12}>
        Change the Grade Criteria
      </Heading>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        marginTop={6}
        padding={6}
        boxShadow="0 0 10px 3px rgba(0, 0, 0, .1)"
      >
        <Stack spacing={8}>
          <Input
            width="50%"
            type="number"
            label="Examination"
            id="examination"
            {...register("examination", {
              required: "Examination is required",
            })}
            error={errors.examination?.message}
          />
          <Input
            width="50%"
            type="number"
            label="Assessment"
            id="assessment"
            {...register("assessment", {
              required: "Assessment is required",
            })}
            error={errors.assessment?.message}
          />
          <Input
            width="50%"
            type="number"
            label="Attendance"
            id="attendance"
            {...register("attendance", {
              required: "Attendance is required",
            })}
            error={errors.attendance?.message}
          />
        </Stack>
        <Flex paddingTop={8} justifyContent="flex-end">
          <Button type="submit" isLoading={isSubmitting}>
            Update
          </Button>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

export const GradeCriteriaPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <GradeCriteriaPage {...props} />} />
  );
};
