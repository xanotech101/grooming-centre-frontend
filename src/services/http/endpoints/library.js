import { http } from "../http";

/**
 * Endpoint to get user `book-listing`
 *
 * @returns {Promise<{ books: BookListArray }>}
 */
export const userGetBookListing = async () => {
  const path = `/library/user/books`;

  const {
    data: { data },
  } = await http.get(path);

  return { books: data };
};

/**
 * Endpoint to get user `audio-listing`
 *
 * @returns {Promise<{ audio: AudioListArray }>}
 */
export const userGetAudioListing = async () => {
  const path = `/library/user/audio`;

  const {
    data: { data },
  } = await http.get(path);

  return { audio: data };
};

/**
 * Endpoint to get user `video-listing`
 *
 * @returns {Promise<{ videos: VideoListArray }>}
 */
export const userGetVideoListing = async () => {
  const path = `/library/user/videos`;

  const {
    data: { data },
  } = await http.get(path);

  return { videos: data };
};
