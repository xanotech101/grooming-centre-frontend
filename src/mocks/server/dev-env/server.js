import { setupWorker } from "msw";
import handlers from "./handlers";

const worker = setupWorker(...handlers);

export const setupDevelopmentServer = () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }
};
