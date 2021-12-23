import { http } from "../http";

export const userGetMessages = async () => {
  const path = `/chat/messages`;

  const {
    data: { data },
  } = await http.get(path);

  const messages = data.map((msg) => ({
    id: msg.id,
    message: msg.message,
    user: {
      profilePics: msg.user.profilePics,
      name: msg.user.firstName + " " + msg.user.lastName,
    },
    date: msg.date,
    unreadCount: msg.unreadCount,
  }));

  return { messages };
};
