import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { userGetMessagesRes } from "./responses";

const userGetMessages = rest.get(
  getUrl("/chat/messages"),
  handleSuccessResponse(userGetMessagesRes)
);

const chat = [userGetMessages];

export default chat;
