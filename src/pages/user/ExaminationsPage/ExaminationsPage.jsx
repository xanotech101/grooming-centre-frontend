import { Box, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { Heading, Image, Link, Text } from "../../../components";
import coverImagePlaceholder from "../../../assets/images/events-banner.svg";
import { pageWrapperSpacing_userPages } from "../../../theme/breakpoints";
import { adminGetPollListing } from "../../../services/http/endpoints/poll";
import { useEffect } from "react";
import { useState } from "react";
import { adminGetStandaloneExaminationListing } from "../../../services";

const ExaminationsPage = () => {
  const [allExams, setExams] = useState();
  const fetcher = async () => {
    const { examinations } = await adminGetStandaloneExaminationListing();
    setExams(examinations);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <Box>
      <Box
        as="section"
        padding={10}
        marginBottom={10}
        color="white"
        position="relative"
      >
        <Image
          src={coverImagePlaceholder}
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          alt="Course Header"
        />

        <Stack
          spacing={7}
          position="relative"
          // zIndex={1}
          {...pageWrapperSpacing_userPages}
        >
          <Heading>Examinations</Heading>
          <Text as="level2">Take your exams here</Text>
        </Stack>
      </Box>
      <Box padding={"1rem"}>
        {allExams &&
          allExams.map((exam, index) => (
            <Link href={`/examinations/take/`} key={exam.id}>
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
                as="level3"
                bold
                mb={{ base: 1, tablet: 2 }}
              >
                {index + 1}) {exam.title}
              </Text>
            </Link>
          ))}
      </Box>
    </Box>
  );
};

export const ExaminationsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <ExaminationsPage {...props} />} />
  );
};
