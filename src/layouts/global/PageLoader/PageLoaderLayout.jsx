import { Grid } from "@chakra-ui/layout";
import { Spinner } from "../../../components";

export const PageLoaderLayout = () => {
  return (
    <Grid height="100vh" width="100vw" placeItems="center">
      <Spinner />
    </Grid>
  );
};
