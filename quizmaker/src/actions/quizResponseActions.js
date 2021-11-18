import axios from "axios";

import {
  QUIZ_RESPONSE_CREATE_FAIL,
  QUIZ_RESPONSE_CREATE_REQUEST,
  QUIZ_RESPONSE_CREATE_SUCCESS,
} from "../constants/quizResponseConstants";

export const postQuizResponse =
  (quizId, quizResponse) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUIZ_RESPONSE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      if (!userInfo) {
        throw new Error("Please Log In to Continue the process");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        "/api/quiz-response",
        {
          name: userInfo.name,
          userId: userInfo._id || userInfo.id,
          emailId: userInfo.email,
          quizId,
          quizResponse,
        },
        config
      );
      dispatch({ type: QUIZ_RESPONSE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: QUIZ_RESPONSE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
