import { forwardRef, useState } from "react";
import { Input } from "./Input";
import { InputRightElement, Button, InputGroup } from "@chakra-ui/react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const PasswordInput = forwardRef(({ props }, ref) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input type={show ? "text" : "password"} ref={ref} {...props} />
      <InputRightElement>
        <Button
          bg="white"
          _hover={{ bg: "white" }}
          _focus={{ border: "none", bg: "white" }}
          _active={{ bg: "white" }}
          size="sm"
          onClick={handleClick}
        >
          {show ? <VisibilityOff /> : <Visibility />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
