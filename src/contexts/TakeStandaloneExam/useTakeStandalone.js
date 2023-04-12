import { useCallback, useContext, useEffect, useState } from 'react';
import { usersGetStandaloneExaminationListing } from '../../services';
import { AppContext } from '../App/AppProvider';

const useTakeStandalone = () => {
  const [examination, setExamination] = useState([]);

  const fetcher = useCallback(async () => {
    try {
      const { examinations } = await usersGetStandaloneExaminationListing();
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
