import PropTypes from "prop-types";
import smLogo from "../../assets/images/Brand.png";
import lgLogo from "../../assets/images/Brand-long.png";
import { Image, Link } from "..";

export const Brand = ({ sm, xs, lg }) => {
  return (
    <Link href="/">
      <Logo sm={sm} lg={lg} xs={xs} withLongLogo />
    </Link>
  );
};

export const BrandLogo = ({ sm, lg, ...rest }) => {
  return (
    <Link href="/">
      <Logo sm={sm} lg={lg} {...rest} />
    </Link>
  );
};

const Logo = ({ sm, lg, xs, withLongLogo, ...rest }) => {
  return (
    <Image
      src={withLongLogo ? lgLogo : smLogo}
      w={
        withLongLogo
          ? "170px"
          : xs
          ? "32px"
          : sm
          ? "40px"
          : lg
          ? "80px"
          : "50px"
      }
      h={
        withLongLogo ? "56px" : xs ? "32px" : sm ? "40px" : lg ? "80px" : "50px"
      }
      {...rest}
    />
  );
};

BrandLogo.propTypes = {
  sm: PropTypes.bool,
};
Brand.propTypes = {
  sm: PropTypes.bool,
  textColor: PropTypes.string,
};
