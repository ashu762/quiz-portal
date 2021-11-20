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
  QUIZ_DELETE_REQUEST,
  QUIZ_DELETE_FAIL,
  QUIZ_DELETE_SUCCESS,
  GENERATE_REPORT_FAIL,
  GENERATE_REPORT_REQUEST,
  GENERATE_REPORT_SUCCESS,
} from "../constants/quizConstants";
import axios from "axios";
export const listQuiz = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Please Log In to Continue the process");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await axios.get("/api/quiz", config);

    dispatch({
      type: QUIZ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const myListQuiz = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MYQUIZ_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Please Log In to Continue the process");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await axios.get(`/api/quiz/users/${userInfo._id}`, config);

    dispatch({
      type: MYQUIZ_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MYQUIZ_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listQuestions = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Please Log In to Continue the process");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await axios.get(`/api/quiz/${id}`, config);

    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postQuiz =
  (name, author, description, isPrivate) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUIZ_CREATE_REQUEST });

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
        "/api/quiz",
        {
          name: name,
          author: author,
          description: description,
          user: userInfo._id,
          isPrivate,
        },
        config
      );
      dispatch({ type: QUIZ_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: QUIZ_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const postQuestion =
  (question, correctOption, options, hint) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_CREATE_REQUEST });

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

      const {
        quizCreate: { quizInfo },
      } = getState();
      const data = await axios.post(
        "/api/question",
        {
          question: question,
          options: options,
          correctOption: Number(correctOption),
          user: userInfo._id || userInfo.id,
          quizName: quizInfo.id,
          hint: hint,
        },
        config
      );
      dispatch({ type: QUESTION_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteMyQuiz = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUIZ_DELETE_REQUEST });

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
    // const {
    //   quizCreate: { quizInfo },
    // } = getState();

    const data = await axios.get(`/api/quiz/delete/${id}`, config);

    dispatch({ type: QUIZ_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUIZ_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearQuestion = () => async (dispatch) => {
  dispatch({ type: QUESTION_CLEAR });
};

export const generateReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GENERATE_REPORT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    if (!userInfo) {
      throw new Error("Please Log In to Continue the process");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const data = await axios.get(`/api/quiz/report/${id}`, config);

    dispatch({
      type: GENERATE_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_REPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
