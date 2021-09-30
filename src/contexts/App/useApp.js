import { useCallback, useContext } from "react";
import { getCurrentUser, getMetadata } from "../../services";
import { AppContext } from "./AppProvider";

/**
 * App state `Manager` - its consumes the ContextProvider and returns whats necessary.
 *
 * @returns  Object {
 *   state: { user: `null`| `{}`, token: `null`| `string`, metadata: `null`| `{}` },
 *   isAuthenticated: `boolean`,
 *   fetchMetadata: () => `Promise<void>`,
 *   handleSetToken: (token: `string`) => `void`,
 *   handleSetCurrentUser: (user: `{}`) => `void`,
 *   handleGetTokenFromClientStorage: () => token: `string`,
 *   handleLogout: () => `void`,
 *   getOneMetadata: (arrayKey: `string`, id: `string`) => (`OneMetadata` || `undefined`),
 * }
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useApp must be used within a AppContext`);
  }

  const [state, setState] = context;

  const fetchMetadata = useCallback(async () => {
    try {
      const { data } = await getMetadata();
      setState((prev) => ({ ...prev, metadata: data }));
    } catch (err) {
      console.error(err);
    }
  }, [setState]);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const { data } = await getCurrentUser();
      setState((prev) => ({ ...prev, user: data }));
    } catch (err) {
      console.error(err);
    }
  }, [setState]);

  const handleGetTokenFromClientStorage = useCallback(() => {
    const token = localStorage.getItem("token");
    return token;
  }, []);

  const handleSetToken = useCallback(
    (token) => {
      if (token) {
        localStorage.setItem("token", token);
        setState((prev) => ({ ...prev, token }));
      }
    },
    [setState]
  );

  const handleSetCurrentUser = useCallback(
    (user) => {
      setState((prev) => ({ ...prev, user }));
    },
    [setState]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setState((prev) => ({ ...prev, user: null, token: null }));
  }, [setState]);

  const getOneMetadata = (arrayKey, id) =>
    state.metadata?.[arrayKey].find((item) => item.id === id);

  const isAuthenticated = handleGetTokenFromClientStorage() ? true : false;

  return {
    state,
    isAuthenticated,
    fetchMetadata,
    handleSetToken,
    handleSetCurrentUser,
    fetchCurrentUser,
    handleGetTokenFromClientStorage,
    handleLogout,
    getOneMetadata,
  };
};
