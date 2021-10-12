import { forwardRef } from "react";
import { Input } from "./Input";
import { InputLeftElement, InputGroup } from "@chakra-ui/react";

export const NumberInput = forwardRef(({ props }, ref) => {
  return (
    <InputGroup color="accent.3" w="100%">
      <InputLeftElement
        pointerEvents="none"
        children="+234"
        w="18%"
        borderRight="1px"
        borderColor="accent.3"
      />
      <Input
        pl={20}
        placeholder="8124567891"
        ref={ref}
        {...props}
        type="tel"
      />
    </InputGroup>
  );
});
