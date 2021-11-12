import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import {
  userForumPublishQuestionRes,
  userForumGetCategoriesRes,
  userForumGetQuestionsRes,
  userForumGetQuestionDetailsRes_questionId_1,
  userForumGetQuestionDetailsRes_questionId_2,
  userForumGetQuestionDetailsRes_questionId_3,
  userForumGetYourQuestionsRes,
  userForumGetQuestionsByTagRes,
  userForumEditQuestionRes,
} from "./responses";

const userForumGetQuestions = rest.get(
  // TODO: change `method`
  getUrl("/forum/question"), // TODO: change `path`
  handleSuccessResponse(userForumGetQuestionsRes)
);

const userForumGetCategories = rest.get(
  // TODO: change `method`
  getUrl("/forum/categories"), // TODO: change `path`
  handleSuccessResponse(userForumGetCategoriesRes)
);

const userForumPublishQuestion = rest.post(
  // TODO: change `method`
  getUrl("/forum/question/create"), // TODO: change `path`
  handleSuccessResponse(userForumPublishQuestionRes)
);

const userForumEditQuestion = [
  rest.patch(
    getUrl("/forum/question/questionId_1"),
    handleSuccessResponse(userForumEditQuestionRes)
  ),
];

const userForumGetQuestionDetails = [
  rest.get(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_1"), // TODO: change `path`
    handleSuccessResponse(userForumGetQuestionDetailsRes_questionId_1)
  ),
  rest.get(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_2"), // TODO: change `path`
    handleSuccessResponse(userForumGetQuestionDetailsRes_questionId_2)
  ),
  rest.get(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_3"), // TODO: change `path`
    handleSuccessResponse(userForumGetQuestionDetailsRes_questionId_3)
  ),
];

const userForumGetYourQuestions = rest.get(
  // TODO: change `method`
  getUrl("/forum/your-questions"), // TODO: change `path`
  handleSuccessResponse(userForumGetYourQuestionsRes)
);

const userForumGetQuestionsByTag = [
  rest.get(
    // TODO: change `method`
    getUrl("/forum/tag/tagId_1/questions"), // TODO: change `path`
    handleSuccessResponse(userForumGetQuestionsByTagRes)
  ),
  rest.get(
    // TODO: change `method`
    getUrl("/forum/tag/tagId_2/questions"), // TODO: change `path`
    handleSuccessResponse(userForumGetQuestionsByTagRes)
  ),
];

const forumQuestion = [
  userForumGetCategories,
  userForumPublishQuestion,
  userForumGetQuestions,
  userForumGetYourQuestions,
  ...userForumGetQuestionsByTag,
  ...userForumGetQuestionDetails,
  ...userForumEditQuestion,
];

export default forumQuestion;
