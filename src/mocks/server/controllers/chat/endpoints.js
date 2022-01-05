import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  userGetOneRoomRes_userId_1,
  userGetOneRoomRes_userId_2,
  userGetMessagingRoomsRes,
} from "./responses";

const userGetMessagingRooms = rest.get(
  getUrl("/chat/rooms"),
  handleSuccessResponse(userGetMessagingRoomsRes)
);

const userGetOneRoom = [
  rest.get(
    getUrl("/chat/rooms/userId_1"),
    handleSuccessResponse(userGetOneRoomRes_userId_1)
  ),
  rest.get(
    getUrl("/chat/rooms/userId_2"),
    handleSuccessResponse(userGetOneRoomRes_userId_2)
  ),
];

const chat = [userGetMessagingRooms, ...userGetOneRoom];

export default chat;
