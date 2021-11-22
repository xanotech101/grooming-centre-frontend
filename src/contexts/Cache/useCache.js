import { useContext } from "react";
import { CacheContext } from "./CacheProvider";

/**
 * Abstracts the `CacheContext` with `useContext`, also provides helpers
 *
 * @returns {{ state, handleGet, handleSet, handleDelete, handleClear, handleGetOrSetAndGet: (key: string, cb: () => Promise<Item<any>>) }}
 */
export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error(`useTakeCourse must be used within a CacheProvider`);
  }
  const [state, setState] = context;

  /**
   * deletes an item
   *
   * @param {string} key
   * @returns {void}
   */
  const handleDelete = (key) => {
    const cache = { ...state };
    Reflect.deleteProperty(cache, key);

    console.log(cache);

    setState(cache);
  };

  /**
   * sets an item
   *
   * @param {string} key
   * @param {*} value
   * @returns {void}
   */
  const handleSet = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * gets an item
   *
   * @param {string} key
   * @returns {null | Item<any>}
   */
  const handleGet = (key) => {
    return state[key] || null;
  };

  /**
   * clears cache
   *
   * @returns {void}
   */
  const handleClear = () => {
    setState({});
  };

  /**
   * gets the `item` if it exists, otherwise gets and sets the `item` return from the `cb`
   *
   * @param {string} key
   * @param {() => Promise<Item<any>>} cb
   *
   * @returns {Promise<Item<any>>}
   */
  const handleGetOrSetAndGet = async (key, cb) => {
    let item = handleGet(key);

    // console.log("cached => ", item);

    if (item) return item;

    item = await cb();
    // console.log("fetched => ", item);

    handleSet(key, item);
    return item;
  };

  return {
    state,
    handleGet,
    handleSet,
    handleDelete,
    handleClear,
    handleGetOrSetAndGet,
  };
};
