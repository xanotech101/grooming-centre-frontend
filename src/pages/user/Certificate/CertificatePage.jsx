import { Route } from "react-router-dom";
import { Flex } from "@chakra-ui/layout";
import { Text } from "../../../components";
import { ReactComponent as Certificate } from "../../../assets/images/Certificate.svg";
import useCertificateDetails from "./hooks/useCertificateDetais";
import { PageLoaderLayout } from "../../../layouts";

const CertificatePage = () => {
  const manager = useCertificateDetails();

  const { certificate, isLoading } = manager;
  return (
    <Flex justifyContent="center" pt={16}>
      {isLoading ? (
        <PageLoaderLayout />
      ) : (
        <>
          <Certificate style={{ display: "flex", position: "relative" }} />
          <Text
          color="black"
            style={{
              display: "flex",
              position: "absolute",
              top: "490px",
              fontSize: "72px",
              fontFamily: "Sacramento",
            }}
          >
            {certificate?.name}
          </Text>
          <Text
            color="others.3"
            style={{
              display: "flex",
              position: "absolute",
              top: "700px",
              fontSize: "28px",
            }}
          >
            {certificate?.title}
          </Text>
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
    </Flex>
  );
};

export const CertificatePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CertificatePage {...props} />} />;
};
