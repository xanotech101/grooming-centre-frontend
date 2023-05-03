import { Route } from "react-router-dom";
import { Certificate } from "../../CertTemplate/CertificateTemplate";
import { adminGetUserDetails, requestCertificateDetails } from "../../../../../services";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { AdminMainAreaWrapper, EmptyState } from "../../../../../layouts";
import { useEffect } from "react";
import { useState } from "react";

const CertificatePage = () => {
  const {id:userId}=useParams()
  const [userDetail, setUserDetails]=useState("")
  console.log(userId);
  const fetcher= async()=>{
    const {user}= await adminGetUserDetails (userId)
    setUserDetails(user);
  }
  useEffect(()=>{
    fetcher()
  },[userDetail])
  return(
    <AdminMainAreaWrapper>
    <Box my={5}>
    <Heading fontSize={"2xl"} m={3}>Certificates Obtained</Heading>
    {userDetail?.noOfCertificate !==0 ?
     <Grid gridTemplateColumns={"1fr 1fr"}>
       <Certificate name={`${userDetail?.firstName} ${userDetail?.lastName}`}/>
   
    </Grid>
    :<EmptyState description={"you are yet to have a certificate"}/>}
   
    </Box> 
    </AdminMainAreaWrapper>
  )
 
};

const CertificatePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CertificatePage {...props} />} />;
};

export default CertificatePageRoute;
