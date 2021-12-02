import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  loggedInUserGetEventListingRes,
  adminCreateEventRes,
} from "./responses";

const loggedInUserGetEventListing = rest.get(
  getUrl("/events"),
  handleSuccessResponse(loggedInUserGetEventListingRes)
);

const adminCreateEvent = rest.post(
  getUrl("/events/create"),
  handleSuccessResponse(adminCreateEventRes)
);

const event = [loggedInUserGetEventListing, adminCreateEvent];

export default event;
