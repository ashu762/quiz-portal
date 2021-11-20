import {
  QUIZ_RESPONSE_CREATE_FAIL,
  QUIZ_RESPONSE_CREATE_REQUEST,
  QUIZ_RESPONSE_CREATE_SUCCESS,
} from "../constants/quizResponseConstants";

export const quizResponseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUIZ_RESPONSE_CREATE_REQUEST:
      return { loading: true };
    case QUIZ_RESPONSE_CREATE_SUCCESS:
      return { loading: false, quizResponseInfo: action.payload.data };
    case QUIZ_RESPONSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
