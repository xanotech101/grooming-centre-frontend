import { useCallback } from "react";
import { useState } from "react";
import { useComponentIsMount } from ".";
import { useCache } from "../contexts";

/**
 * Fetches, manages and `caches` the resource
 *
 * @returns {{ resource: { data: null | {}, loading: boolean, err: null | string }, handleFetchResource: ({ cacheKey: string, fetcher: () => Promise<any> }) => void }}
 */
export const useFetchAndCache = () => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();

  const [resource, setResource] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const handleFetchResource = useCallback(
    async ({ cacheKey, fetcher }) => {
      setResource({ loading: true });

      try {
        const resource = await handleGetOrSetAndGet(cacheKey, fetcher);

        if (componentIsMount) setResource({ data: resource });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setResource({ err: err.message });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentIsMount]
  );

  return {
    resource,
    handleFetchResource,
  };
};

/**
 * Fetches and manages the resources
 *
 * @returns {{ resource: { data: null | {}, loading: boolean, err: null | string }, handleClearResource: () => void, handleFetchResource: ({ fetcher: () => Promise<any> }) => void }}
 */
export const useFetch = () => {
  const componentIsMount = useComponentIsMount();

  const [resource, setResource] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const handleFetchResource = useCallback(
    async ({ fetcher }) => {
      setResource({ loading: true });

      try {
        const resource = await fetcher();

        console.log(resource);

        if (componentIsMount) setResource({ data: resource });
      } catch (err) {
        console.error(err);
        if (componentIsMount) setResource({ err: err.message });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentIsMount]
  );

  const handleClearResource = () =>
    setResource((prev) => ({ ...prev, data: null }));

  return {
    resource,
    setResource,
    handleFetchResource,
    handleClearResource,
  };
};
