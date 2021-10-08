import { Grid } from "@chakra-ui/layout";
import { Spinner } from "../../../components";

export const PageLoaderLayout = ({ children = <Spinner /> }) => {
  return (
    <Grid height="100vh" width="100vw" placeItems="center">
      {children}
    </Grid>
  );
};
