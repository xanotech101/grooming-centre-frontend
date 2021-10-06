import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useCache } from "..";
import useCourseDetails from "../../pages/user/Courses/CourseDetails/hooks/useCourseDetails";
import { TakeCourseContext } from "./TakeCourseProvider";

const takeCourseData = {
  id: "1234567890098765421",
  title: "Web Design & Development Crash Course 2021",
  lessons: [
    {
      id: "123454321",
      disabled: false,
      title: "Why this course?",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "video",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor. Maecenas auctor ac et neque in amet odio. In justo proin ipsum nam congue tortor a.",
    },
    {
      id: "098765678s",
      disabled: false,
      title: "Introduction to HTML",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "video",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor. Maecenas auctor ac et neque in amet odio. In justo proin ipsum nam congue tortor a.",
    },
    {
      id: "536hs5272",
      disabled: false,
      title: "Resources: Consume this contents",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      file: "file_url",
      lessonType: {
        id: "232",
        name: "pdf",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit volutpat pellentesque elit dolor ultricies purus. Scelerisque tempus, nunc, nibh enim, porttitor et. Hendrerit elementum pretium leo nibh interdum. Mattis pharetra in leo elementum sed gravida senectus. Dictum ultrices proin scelerisque convallis habitant. Ultrices a, consequat nulla arcu dui tellus adipiscing. Morbi amet pulvinar maecenas euismod a, vitae. Mauris sapien, luctus magna lobortis adipiscing risus, lectus tortor.",
    },
  ],

  assessment: {
    id: "assessement_id",
    // title: "The title of the assessment",
    // disabled: true,
  },
};

const fetchTakeCourseData = async () =>
  new Promise((res) => {
    setTimeout(() => {
      res(takeCourseData);
    }, 1500);
  });

/**
 * TakeCourseLayout state `Manager` - its consumes the ContextProvider and returns whats neccessary.
 *
 * @returns  Object {
 *  state: {
 *    data: `Object` | `null`,
 *    err: `ErrorObject` | `null`,
 *    isLoading: `boolean`
 *  }
 * }
 */
export const useTakeCourse = () => {
  const { course_id } = useParams();
  // console.log(course_id);

  const { fetchCourseDetails, courseDetails } = useCourseDetails(course_id);

  const cacheManager = useCache();

  const context = useContext(TakeCourseContext);
  if (!context) {
    throw new Error(
      `useTakeCourse must be used within a TakeCourseContextProvider`
    );
  }

  const [state, setState] = context;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        await fetchCourseDetails();

        // const data = await fetchTakeCourseData();

        // if (isMounted) {
        //   setState((prev) => ({ ...prev, data, isLoading: false }));
        // }
      } catch (err) {
        setState({ data: null, err, isLoading: false });
        console.error(err);
      }
    };

    if (course_id) fetchData();

    return () => {
      isMounted = false;
      setState((prev) => ({ ...prev, isLoading: false }));
    };
  }, [course_id]);

  useEffect(() => {
    if (cacheManager.state[course_id]) {
      setState({ data: cacheManager.state[course_id] });
    }
  }, [cacheManager.state[course_id]]);

  // useEffect(() => {
  //   if (state.data) {
  //     console.log(state.data);
  //   }
  // }, [state.data]);

  return {
    state,
  };
};
