import { useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import { Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Route, useParams, useHistory } from "react-router-dom";
import {
  Input,
  Select,
  Upload,
  Breadcrumb,
  Link,
  Heading,
  Spinner,
  Textarea,
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpload } from "../../../hooks";
import {
  appendFormData,
  capitalizeFirstLetter,
  populateSelectOptions,
} from "../../../utils";
import { useApp, useCache } from "../../../contexts";
import {
  adminEditLibraryFile,
  adminUploadLibraryFile,
} from "../../../services";
import useViewLibraryFile from "./hook/useViewLibraryFile";

const CreateLibraryFilePage = () => {
  const { id: fileId } = useParams();

  const isEditMode = fileId && fileId !== "new";

  const { push } = useHistory();
  const toast = useToast();
  const { handleDelete } = useCache();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    state: { metadata },
    getOneMetadata,
  } = useApp();

  const fileManager = useUpload();

  const { library } = useViewLibraryFile();
  const libraryFile = library.data;
  const isLoading = library.loading;
  const isError = library.error;

  // Init `Title` value
  useEffect(() => {
    if (libraryFile) {
      setValue("title", libraryFile.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryFile]);

  useEffect(() => {
    if (libraryFile && metadata?.departments) {
      setValue("departmentId", libraryFile.department.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryFile, metadata?.departments]);

  useEffect(() => {
    if (libraryFile) {
      setValue("description", libraryFile.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryFile]);

  const setLibraryAccept = (libraryTypeId) => {
    const libraryType = getOneMetadata("libraryType", libraryTypeId)?.name;

    if (libraryType === "pdf") {
      fileManager.handleAcceptChange("application/pdf");
    }

    if (libraryType === "video") {
      fileManager.handleAcceptChange("video/mp4, video/mkv");
    }

    if (libraryType === "audio") {
      fileManager.handleAcceptChange("audio/mpeg, audio/ogg, audio/wav");
    }
  };

  // Init `libraryTypeId` value and set `accept` for file upload input
  useEffect(() => {
    if (libraryFile && metadata) {
      setValue("libraryTypeId", libraryFile.libraryTypeId);
      setLibraryAccept(libraryFile.libraryTypeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryFile, metadata]);

  // Init `library File` file url
  useEffect(() => {
    if (libraryFile) {
      const fileIsAVideo = libraryFile.fileExtension === "mp4";
      const fileIsPDF = libraryFile.fileExtension === "pdf";
      const fileIsAudio = libraryFile.fileExtension === "mp3";

      if (fileIsAVideo) {
        fileManager.handleInitialVideoSelect(libraryFile.file);
      }
      if (fileIsPDF) {
        fileManager.handleInitialPdfSelect(libraryFile.file);
      }
      if (fileIsAudio) {
        fileManager.handleInitialAudioSelect(libraryFile.file);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libraryFile]);

  // Control `library File` with `File Type`
  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      console.log({ name, type, data });

      if (name === "libraryTypeId") {
        fileManager.handleFileSelect(null);

        setLibraryAccept(data.libraryTypeId);
      }
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, metadata]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const file = fileManager.handleGetFileAndValidate(
        "Library File",
        isEditMode
      );

      data = {
        ...data,
        fileId,
        file,
      };

      if (isEditMode) Reflect.deleteProperty(data, "fileId");

      const body = appendFormData(data);

      const { message, library } = await (isEditMode
        ? adminEditLibraryFile(fileId, body)
        : adminUploadLibraryFile(body));

      if (isEditMode) handleDelete(library.id);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      push(`/admin/library/details/${fileId}`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return isEditMode && (isLoading || isError) ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Heading color="red.500">{isError}</Heading>
      ) : null}
    </Flex>
  ) : (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/library">Library</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">{isEditMode ? "Edit" : "Create"}</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <CreatePageLayout
        title={isEditMode ? "Edit File details" : "Upload File"}
        submitButtonText={
          isSubmitting
            ? "Please wait this might take a while"
            : isEditMode
            ? "Update File"
            : "Add File"
        }
        onSubmit={handleSubmit(onSubmit)}
        submitButtonIsDisabled={!metadata}
        submitButtonIsLoading={isSubmitting}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
          {/* Row 1 */}
          <GridItem>
            <Input
              label="Title"
              id="title"
              {...register("title", {
                required: "Title is required",
              })}
              error={errors.title?.message}
            />
          </GridItem>
          <GridItem>
            <Select
              label="Select department"
              options={populateSelectOptions(metadata?.departments)}
              id="departmentId"
              isLoading={!metadata?.departments}
              {...register("departmentId", {
                required: "Please select a department",
              })}
              error={errors.departmentId?.message}
            />
          </GridItem>
        </Grid>
        {/* Row 2 */}
        <Grid marginBottom={10}>
          <Textarea
            minHeight="150px"
            label="Description"
            id="description"
            isRequired
            {...register("description", {
              required: "Please add a description",
              maxLength: 1000,
            })}
            error={
              errors.description?.type === "maxLength"
                ? "Maximum length of 1000 characters"
                : errors.description?.message
            }
          />
        </Grid>

        <Grid marginBottom={10}>
          <GridItem>
            <Select
              id="libraryTypeId"
              width="50%"
              label="File type"
              options={populateSelectOptions(metadata?.libraryType)}
              isLoading={!metadata?.libraryType}
              isRequired
              error={errors.libraryTypeId?.message}
              {...register("libraryTypeId", {
                required: "File type is required",
              })}
            />
          </GridItem>
        </Grid>
        <Grid marginBottom={10}>
          <GridItem colSpan={2}>
            <Upload
              id="file"
              label="Library file"
              isRequired
              videoUrl={fileManager.video.url}
              pdfUrl={fileManager.pdf.url}
              audioUrl={fileManager.audio.url}
              disabled={!getValues("libraryTypeId")}
              onFileSelect={fileManager.handleFileSelect}
              accept={fileManager.accept}
            />
          </GridItem>
        </Grid>
      </CreatePageLayout>
    </>
  );
};

export const CreateLibraryFilePageRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest} render={(props) => <CreateLibraryFilePage {...props} />} />
  );
};
