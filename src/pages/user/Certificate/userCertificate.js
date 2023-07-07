import { Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/layout";
import { Text } from "../../../components";
import Certificate from "../../../assets/images/grooming-cert.png";
import useCertificateDetails from "./hooks/useCertificateDetais";
import { PageLoaderLayout } from "../../../layouts";
import { EmptyState } from "../Courses/Grades/GradesPage";

const UserCertificate = () => {
  const manager = useCertificateDetails();

  const { certificate, isLoading, error } = manager;

  return (
    <Flex justifyContent="center" pt={16} minH={"100vh"} px={10}>
      {isLoading ? (
        <PageLoaderLayout />
      ) : (
        <>
          {error ? (
            <EmptyState text={error} />
          ) : (
            <>
              {" "}
              <Box pos="relative" w={"800px"}>
                <img
                  width={"100%"}
                  src={Certificate}
                  style={{ position: "relative" }}
                />
                <Box
                  color="black"
                  style={{
                    display: "flex",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    fontSize: "40px",
                    top: "0",
                    left: "0",
                    fontFamily: "Sacramento",
                    textTransform: "capitalize",
                  }}
                >
                  <Box textAlign={"center"} mt={"225px"} ml="280px">
                    {certificate?.user?.firstName} {certificate?.user?.lastName}
                  </Box>
                  <Text
                    color="others.3"
                    style={{
                      display: "flex",
                      position: "absolute",
                      top: "340px",
                      right: "340px",
                      fontFamily: "Sacramento",
                      fontSize: "30px",
                    }}
                  >
                    {certificate?.course?.courseTitle}
                  </Text>
                </Box>
              </Box>
              <Text
                color="accent.3"
                style={{
                  display: "flex",
                  position: "absolute",
                  top: "750px",
                  fontSize: "24px",
                }}
              >
                {certificate?.endDate}
              </Text>
            </>
          )}
          <></>
        </>
      )}
    </Flex>
  );
};

export const UserCertificatePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserCertificate {...props} />} />;
};
