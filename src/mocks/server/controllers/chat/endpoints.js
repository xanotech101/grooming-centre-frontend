import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  userGetAUserMessagesRes_userId_1,
  userGetAUserMessagesRes_userId_2,
  userGetMessagesRes,
} from "./responses";

const userGetUsersMessages = rest.get(
  getUrl("/chat/messages/users"),
  handleSuccessResponse(userGetMessagesRes)
);

const userGetAUserMessages = [
  rest.get(
    getUrl("/chat/messages/users/userId_1"),
    handleSuccessResponse(userGetAUserMessagesRes_userId_1)
  ),
  rest.get(
    getUrl("/chat/messages/users/userId_2"),
    handleSuccessResponse(userGetAUserMessagesRes_userId_2)
  ),
];

const chat = [userGetUsersMessages, ...userGetAUserMessages];

export default chat;
