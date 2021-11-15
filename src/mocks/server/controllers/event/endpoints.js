import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { loggedInUserGetEventListingRes } from "./responses";

const loggedInUserGetEventListing = rest.post(
  getUrl("/events"),
  handleSuccessResponse(loggedInUserGetEventListingRes)
);

const event = [loggedInUserGetEventListing];

export default event;
