import {
  Breadcrumb as BreadcrumbChakraui,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRight } from "@material-ui/icons"

export const Breadcrumb = ({ item2, item3, item4, props}) => {

  return (
    <BreadcrumbChakraui
      paddingY={4}
      spacing="8px"
      color="accent.3"
      fontSize={14}
      {...props}
      separator={<ChevronRight style={{fontSize: 18}} color="accent.3" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
      </BreadcrumbItem>
      {item2}
      {item3}
      {item4}
    </BreadcrumbChakraui>
  );
}

