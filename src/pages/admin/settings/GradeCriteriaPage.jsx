import { Box, Grid } from "@chakra-ui/layout";
import { BiCertification } from "react-icons/bi";
import { FiCheckSquare } from "react-icons/fi";
import { ImArrowUp } from "react-icons/im";
import { Route } from "react-router-dom";
import { Heading } from "../../../components";
import { AdminMainAreaWrapper } from "../../../layouts/admin/MainArea/Wrapper";
import { OverviewBox } from "../users/UserInfoPage/pages/ProfilePage";

const GradeCriteriaPage = () => {
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
          value="30%"
          name="Exams"
          icon={<ImArrowUp />}
          iconBackgroundColor="accent.6"
        />
        <OverviewBox
          value="60%"
          name="Assessments"
          icon={<FiCheckSquare />}
          iconBackgroundColor="accent.7"
        />
        <OverviewBox
          value="10%"
          name="Attendance"
          icon={<BiCertification />}
          iconBackgroundColor="secondary.5"
        />
      </Grid>
      <Heading fontSize="heading.h3" marginTop={12}>
        Overview of Students Performance
      </Heading>
      <Box
        marginTop={6}
        padding={6}
        height={80}
        boxShadow="0 0 10px 3px rgba(0, 0, 0, .1)"
      ></Box>
    </AdminMainAreaWrapper>
  );
};

export const GradeCriteriaPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <GradeCriteriaPage {...props} />} />
  );
};
