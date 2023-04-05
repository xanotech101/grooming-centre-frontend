import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Button } from '../../../../../components';
import { useQueryParams } from '../../../../../hooks';
import { adminEditStandaloneExamination } from '../../../../../services';

const StandAloneHeader = ({ assessment }) => {
  const { id } = useParams();

  const examinationId = useQueryParams().get('examination');
  const myId = useQueryParams().get('question');
  const [questionId, setQuestionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setisPublished] = useState(assessment?.isPublished);
  const { push } = useHistory();

  useEffect(() => {
    setisPublished(assessment?.isPublished);
  }, [assessment?.isPublished]);

  const handlePublishing = async () => {
    setIsLoading(true);
    try {
      const body = {
        isPublished: !isPublished,
      };
      const { examination } = await adminEditStandaloneExamination(
        examinationId,
        body
      );
      setisPublished(examination?.isPublished);
      setIsLoading(false);
      push(`/admin/standalone-exams`);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!myId === true) setQuestionId('new');
    else {
      setQuestionId(myId);
    }
  }, [myId]);

  const examIdCheck =
    !examinationId && !questionId
      ? '/admin/standalone-exams/questions'
      : examinationId && !questionId
      ? `/admin/standalone-exams/questions/?examination=${examinationId}`
      : `/admin/standalone-exams/questions/?examination=${examinationId}&question=${questionId}`;
  return (
    <>
      <Box
        backgroundColor="white"
        shadow="0 2px 2px rgba(0, 0, 0, .05)"
        marginTop="20px"
        marginLeft="22px"
        height="auto"
        alignItems="center"
        width={{ sm: '90%', md: '91%', lg: '96%' }}
        padding={6}
      >
        <Box
          display="flex"
          gap={{ sm: '10px', lg: '0px' }}
          flexDirection={{ sm: 'column', lg: 'row' }}
          justifyContent="space-between"
        >
          <Box display="flex" gap="20px" alignItems="center">
            <NavLink
              style={(state) => ({
                color: state ? '#000000' : '#6C6C6C',
              })}
              to={`/admin/standalone-exams/overview${
                examinationId ? `?examination=${examinationId}` : ''
              }`}
            >
              Overview
            </NavLink>
            {!examinationId ? (
              <p style={{ color: '#6c6c6c', cursor: 'pointer' }}>Questions</p>
            ) : (
              <NavLink
                style={(state) => ({
                  color: state ? '#000000' : '#6C6C6C',
                })}
                to={examIdCheck}
                disabled={!examinationId}
              >
                Questions
              </NavLink>
            )}
            {!examinationId ? (
              <p style={{ color: '#6c6c6c', cursor: 'pointer' }}>
                Participants
              </p>
            ) : (
              <NavLink
                style={(state) => ({
                  color: state ? '#000000' : '#6C6C6C',
                })}
                to={`/admin/standalone-exams/participants/${
                  examinationId ? `?examination=${examinationId}` : ''
                }`}
                disabled={!examinationId}
              >
                Participants
              </NavLink>
            )}
          </Box>

          <Box display="flex" gap="10px">
            {examinationId ? (
              <Flex width="180px">
                <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={() => handlePublishing()}
                  width="100%"
                >
                  {isPublished ? 'Unpublish' : 'Publish'}
                </Button>
              </Flex>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StandAloneHeader;
