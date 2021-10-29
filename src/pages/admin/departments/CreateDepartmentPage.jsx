import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  Input,
  Breadcrumb,
  Link,
  Button,
} from "../../../components";
import { BreadcrumbItem, Box } from "@chakra-ui/react";


const CreateDepartmentPage = ({ metadata: propMetadata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
 
  const onSubmit = async (data) => {
   console.log(data);
  };

  return (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/departments">Departments</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Create</Link>
            </BreadcrumbItem>
          }
        />
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box marginX={6} marginY={10} padding={10} backgroundColor="white">
          <Input
            label="Title"
            id="title"
            width="50%"
            {...register("title", {
              required: "Title is required",
            })}
            error={errors.title?.message}
          />
          <Button
            marginTop={10}
            isLoading={isSubmitting}
            type="submit"
          >
            Create Deparment
          </Button>
        </Box>
      </Box>
    </>
  );
};

export const CreateDepartmentPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateDepartmentPage {...props} />} />
  );
};
