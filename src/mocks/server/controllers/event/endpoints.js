import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  userGetEventListingRes,
  adminCreateEventRes,
  adminGetEventListingRes,
} from "./responses";

const userGetEventListing = rest.get(
  getUrl("/events"),
  handleSuccessResponse(userGetEventListingRes)
);
const adminGetEventListing = rest.get(
  getUrl("/admin/events"),
  handleSuccessResponse(adminGetEventListingRes)
);

const adminCreateEvent = rest.post(
  getUrl("/events/create"),
  handleSuccessResponse(adminCreateEventRes)
);

const event = [userGetEventListing, adminCreateEvent, adminGetEventListing];

export default event;
