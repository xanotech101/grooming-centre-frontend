import { forwardRef } from "react";
import { Input } from "./Input";
import { Box } from "@chakra-ui/react";

export const TagsInput = forwardRef((props, ref) => {
  //   const [show, setShow] = useState(false);
  //   const handleClick = () => setShow(!show);

  return (
    <Box>
      <Input ref={ref} {...props} />
    </Box>
  );
});
