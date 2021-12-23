import { http } from "../http";

export const userGetUsersMessages = async () => {
  const path = `/chat/messages/users`;

  const {
    data: { data },
  } = await http.get(path);

  const users = data.map((userMsg) => ({
    id: userMsg.id,
    message: userMsg.lastMessage,
    user: {
      id: userMsg.user.id,
      profilePics: userMsg.user.profilePics,
      name: userMsg.user.firstName + " " + userMsg.user.lastName,
    },
    date: userMsg.date,
    unreadCount: userMsg.unreadCount,
  }));

  return { users };
};

export const userGetAUserMessages = async (id) => {
  const path = `/chat/messages/users/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  const user = {
    id: data.id,
    user: {
      id: data.user.id,
      profilePics: data.user.profilePics,
      name: data.user.firstName + " " + data.user.lastName,
    },
  };

  return { user };
};
