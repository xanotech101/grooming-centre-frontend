import { useCallback, useEffect, useState } from 'react';
import { usersGetStandaloneExaminationListing } from '../../services';

const useTakeStandalone = () => {
  const [examination, setExamination] = useState([]);

  const fetcher = useCallback(async () => {
    try {
      const { examinations } = await usersGetStandaloneExaminationListing();
      console.log(examination);
      setExamination(examinations);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { examination };
};

export default useTakeStandalone;
