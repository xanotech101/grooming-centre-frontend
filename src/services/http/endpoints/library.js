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

  return {
    books: data.map((book) => ({
      id: book.id,
      description: book.description,
      title: book.title,
      file: book.file,
      fileExtension: book.fileExtension,
      instructor: {
        id: book.uploader.id,
        profilePics: book.uploader.profilePics,
        firstName: book.uploader.firstName,
        lastName: book.uploader.lastName,
        title: book.uploader.title,
      },
    })),
  };
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

  return {
    audio: data.map((aud) => ({
      id: aud.id,
      description: aud.description,
      title: aud.title,
      file: aud.file,
      fileExtension: aud.fileExtension,
      instructor: {
        id: aud.uploader.id,
        profilePics: aud.uploader.profilePics,
        firstName: aud.uploader.firstName,
        lastName: aud.uploader.lastName,
        title: aud.uploader.title,
      },
    })),
  };
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

  return {
    videos: data.map((video) => ({
      id: video.id,
      description: video.description,
      title: video.title,
      file: video.file,
      fileExtension: video.fileExtension,
      instructor: {
        id: video.uploader.id,
        profilePics: video.uploader.profilePics,
        firstName: video.uploader.firstName,
        lastName: video.uploader.lastName,
        title: video.uploader.title,
      },
    })),
  };
};

/**
 * Endpoint to get `library-listing`
 *
 * @returns {Promise<{ data: LibraryListArray }>}
 */
export const adminLibraryListing = async () => {
  const path = `/admin/library`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    library: data.rows.map((lib) => ({
      id: lib.id,
      title: lib.title,
      description: lib.description,
      department: {
        id: lib.department.id,
        name: lib.department.name,
      },
      libraryType: {
        id: lib.libraryType.id,
        name: lib.libraryType.name,
      },
      file: lib.file,
      fileExtension: lib.fileExtension,
      instructor: {
        id: lib.uploader.id,
        profilePics: lib.uploader.profilePics,
        firstName: lib.uploader.firstName,
        lastName: lib.uploader.lastName,
        title: lib.uploader.title,
      },
    })),
  };
};
