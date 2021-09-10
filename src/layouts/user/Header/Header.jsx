import { Flex } from "@chakra-ui/layout";
import { BrandLogo, SearchBar } from "../../../components";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      paddingX={5}
      shadow="md"
      minHeight="60px"
    >
      <Flex>
        <BrandLogo sm marginRight={5} />

        <SearchBar width="350px" />
      </Flex>

      <NavBar />
    </Flex>
  );
};

export default Header;
