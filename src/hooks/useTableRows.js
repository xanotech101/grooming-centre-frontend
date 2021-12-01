import { useFetch } from ".";

export const useTableRows = (fetcher) => {
  const {
    resource: rows,
    setResource: setRows,
    handleFetchResource,
  } = useFetch();

  const fetchUsers = (props) => {
    handleFetchResource({ fetcher: fetcher(props) });
  };

  return {
    rows,
    setRows,
    fetchUsers,
  };
};
