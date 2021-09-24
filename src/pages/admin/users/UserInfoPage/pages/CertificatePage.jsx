import { Route } from "react-router-dom";

const CertificatePage = () => {
  return "CertificatePage";
};

const CertificatePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CertificatePage {...props} />} />;
};

export default CertificatePageRoute;
