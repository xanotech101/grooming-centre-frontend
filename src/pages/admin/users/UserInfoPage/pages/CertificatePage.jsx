import { Route } from "react-router-dom";
import { Certificate } from "../../CertTemplate/CertificateTemplate";
import {
  CertificateList,
  adminGetUserDetails,
  requestCertificateDetails,
} from "../../../../../services";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { AdminMainAreaWrapper, EmptyState } from "../../../../../layouts";
import { useEffect } from "react";
import { useState } from "react";

const CertificatePage = () => {
  const { id: courseId } = useParams();
  const [userDetail, setUserDetails] = useState("");

  const fetcher = async () => {
    const { user } = await adminGetUserDetails(courseId);
    setUserDetails(user);
  };
  const fetcher2 = async (props) => {
    const { data } = await CertificateList(props?.params);
    console.log(data);
  };

  useEffect(() => {
    fetcher();
  }, []);
  useEffect(() => {
    fetcher2();
  }, []);
  return (
    <AdminMainAreaWrapper>
      <Box my={5}>
        <Heading fontSize={"2xl"} m={3}>
          Certificates Obtained
        </Heading>
        {userDetail?.noOfCertificate !== 0 ? (
          <Grid gridTemplateColumns={"1fr 1fr"}>
            <Certificate
              name={`${userDetail?.firstName} ${userDetail?.lastName}`}
            />
          </Grid>
        ) : (
          <EmptyState description={"you are yet to have a certificate"} />
        )}
      </Box>
    </AdminMainAreaWrapper>
  );
};

const CertificatePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CertificatePage {...props} />} />;
};

export default CertificatePageRoute;
