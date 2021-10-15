import { useCallback } from "react";
import { useState } from "react";
import { useComponentIsMount } from ".";
import { useCache } from "../contexts";

/**
 * Fetches resource ans caches it with `useCache.handleGetOrSetAndGet`
 *
 * @returns {{ resource: { data: null | {}, loading: boolean, err: null | string }, handleFetchResource: ({ cacheKey: string, fetcher: () => Promise<{}> }) => void }}
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
