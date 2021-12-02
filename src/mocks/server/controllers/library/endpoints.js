import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminLibraryListingRes,
  userAudioListingRes,
  userBookListingRes,
  userVideoListingRes,
} from "./responses";

const userGetBookListing = rest.get(
  getUrl("/library/user/books"),
  handleSuccessResponse(userBookListingRes)
);

const userGetAudioListing = rest.get(
  getUrl("/library/user/audio"),
  handleSuccessResponse(userAudioListingRes)
);

const userGetVideoListing = rest.get(
  getUrl("/library/user/videos"),
  handleSuccessResponse(userVideoListingRes)
);

const adminLibraryListing = rest.get(
  getUrl("/admin/library"),
  handleSuccessResponse(adminLibraryListingRes)
);

const library = [
  userGetBookListing,
  userGetAudioListing,
  userGetVideoListing,
  adminLibraryListing,
];

export default library;
