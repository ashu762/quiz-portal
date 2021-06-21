import {
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_SUCCESS,
  QUIZ_LIST_FAIL,
  QUIZ_LIST_REQUEST,
  QUIZ_LIST_SUCCESS,
  QUIZ_CREATE_FAIL,
  QUIZ_CREATE_REQUEST,
  QUIZ_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CLEAR,
  MYQUIZ_LIST_FAIL,
  MYQUIZ_LIST_REQUEST,
  MYQUIZ_LIST_SUCCESS,
  QUIZ_DELETE_FAIL,
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_SUCCESS,
} from "../constants/quizConstants";

export const quizListReducer = (state = { quiz: [] }, action) => {
  switch (action.type) {
    case QUIZ_LIST_REQUEST:
      return { loading: true, quiz: [] };
    case QUIZ_LIST_SUCCESS:
      return { loading: false, quiz: action.payload.data };
    case QUIZ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MyQuizListReducer = (state = { myQuiz: [] }, action) => {
  switch (action.type) {
    case MYQUIZ_LIST_REQUEST:
      return { loading: true, myQuiz: [] };
    case MYQUIZ_LIST_SUCCESS:
      return { loading: false, myQuiz: action.payload.data };
    case MYQUIZ_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionListReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { loading: true, questions: [] };
    case QUESTION_LIST_SUCCESS:
      return { loading: false, questions: action.payload.data };
    case QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const quizCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_CREATE_REQUEST:
      return { loading: true };
    case QUIZ_CREATE_SUCCESS:
      return { loading: false, quizInfo: action.payload.data };
    case QUIZ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, questionInfo: action.payload.data };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case QUESTION_CLEAR:
      return {};
    default:
      return state;
  }
};

export const quizDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_DELETE_REQUEST:
      return { loading: true };
    case QUIZ_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUIZ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
