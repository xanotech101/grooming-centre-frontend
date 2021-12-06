import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestCertificateDetails } from "../../../../services";
import { useCache } from "../../../../contexts";
import useComponentIsMount from "../../../../hooks/useComponentIsMount";

const useCertificateDetails = () => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { course_id: courseId } = useParams();

  const [certificateDetails, setCertificateDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const { certificate } = await requestCertificateDetails(courseId);
    return certificate;
  }, [courseId]);
  const fetchCertificateDetails = useCallback(async () => {
    setCertificateDetails({ loading: true });

    try {
      const certificateDetails = await handleGetOrSetAndGet(courseId, fetcher);

      console.log(certificateDetails);

      
      if (componentIsMount) setCertificateDetails({ data: certificateDetails });
    } catch (err) {
      if (componentIsMount) setCertificateDetails({ err: err.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, componentIsMount]);

  useEffect(() => {
    fetchCertificateDetails();
  }, [fetchCertificateDetails]);

  const certificate = certificateDetails.data;
  const isLoading = certificateDetails.loading;
  const error = certificateDetails.err;

  return {
    certificate,
    isLoading,
    error,
  };
};

export default useCertificateDetails;
