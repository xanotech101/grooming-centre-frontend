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
 * @param {object} params
 *
 * @returns {Promise<{ data: LibraryListArray }>}
 */
export const adminLibraryListing = async (params) => {
  const path = `/admin/library`;

  const {
    data: { data },
  } = await http.get(path, { params });

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
    showingDocumentsCount: data.rows.length,
    totalDocumentsCount: data.rows.length,
  };
};

/**
 * Endpoint to get `library-file-details`
 * @param {string} id - fileId
 *
 * @returns {Promise<{ library: Library }>}
 */
export const requestLibraryFileDetails = async (id) => {
  const path = `/library/${id}`;

  const {
    data: { data },
  } = await http.get(path);

  return {
    library: {
      ...data,
    },
  };
};

/**
 * Endpoint to for admin to upload library file
 * @param {{ title: string, departmentId: string, description: string, libraryTypeId: string, file: File }} body
 *
 * @returns {Promise<{ message: string, library: { id: string } }>}
 */
export const adminUploadLibraryFile = async (body) => {
  const path = `/library/create`;

  const {
    data: { message, data },
  } = await http.post(path, body);

  const library = {
    id: data.id,
  };

  return { message, library };
};

/**
 * Endpoint to for admin to edit a library file
 * @param {{ title: string, departmentId: string, description: string, libraryTypeId: string, file: File }} body
 *
 * @returns {Promise<{ message: string, library: { id: string } }>}
 */
export const adminEditLibraryFile = async (id, body) => {
  const path = `/library/edit/${id}`;

  const {
    data: { message, data },
  } = await http.patch(path, body);

  const library = {
    id: data[0].id,
  };

  return { message, library };
};
