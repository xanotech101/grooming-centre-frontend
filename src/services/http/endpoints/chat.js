import { http } from "../http";
import dayjs from "dayjs";
import { truncateText } from "../../../utils";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const userGetMessagingRooms = async () => {
  const path = `/chat/rooms`;

  const {
    data: { data },
  } = await http.get(path);

  const rooms = data.map((room) => ({
    id: room.id,
    isGroup: room.isGroup,
    name: room.name,
    image: room.image,
    unreadCount: room.unreadCount,
    message: {
      text: room.message.text,
      date: dayjs().to(dayjs(room.message.createdAt)),
      file: room.message.file
        ? {
            // url: room.message.file.url,
            // extension: room.message.file.extension,
            type: room.message.file.type,
            name: `${truncateText(room.message.file.name, 25)}.${
              room.message.file.extension
            }`,
          }
        : null,
    },
  }));

  return { rooms };
};

export const userGetOneRoom = async (id) => {
  const path = `/chat/rooms/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const user = {
    // id: data.id,
    user: {
      id: data.user.id,
      profilePics: data.user.profilePics,
      name: data.user.firstName + " " + data.user.lastName,
    },
    conversations: data.messages.map((msg) => ({
      id: msg.id,
      title: msg.title,
      date: dayjs().to(dayjs(msg.createdAt)),
      userId: msg.user.id,
      userProfilePics: msg.user.profilePics,
    })),
  };

  return { user };
};

export const currentUserMessagePayload = ({ title, userId }) => ({
  id: `${Date.now()}`,
  date: dayjs().to(dayjs(new Date().toISOString())),
  title,
  userId,
});
