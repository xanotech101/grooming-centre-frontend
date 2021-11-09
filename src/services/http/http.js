import axios from "axios";
import AppError from "./AppError";

// Intercept all Errors
axios.interceptors.response.use(null, (err) => {
  const error = new AppError(err);

  return Promise.reject(error);
});

export const baseURL = "https://cors-anywhere.herokuapp.com/https://groomingcenter.herokuapp.com/api/v1";
const token = localStorage.getItem("token");

const defaultOptions = (explicitToken = token) => ({
  // timeout's the request in a minute by default
  timeout: 60 * 1000,
  // withCredentials: true,
  // credentials: "include",
  headers: {
    authorization: `Bearer ${explicitToken}`,
  },
});

const buildOptions = (options) => ({
  ...defaultOptions(options?.token),
  ...options,
});
const buildURL = (path) => {
  return baseURL + path;
};

export const http = {
  get: (path, options) =>
    axios.get(options?.url || buildURL(path), buildOptions(options)),
  post: (path, data, options) =>
    axios.post(options?.url || buildURL(path), data, buildOptions(options)),
  patch: (path, data, options) =>
    axios.patch(options?.url || buildURL(path), data, buildOptions(options)),
  delete: (path, options) =>
    axios.delete(options?.url || buildURL(path), buildOptions(options)),
};
