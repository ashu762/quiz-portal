import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  quizListReducer,
  questionListReducer,
  quizCreateReducer,
  questionCreateReducer,
  MyQuizListReducer,
  quizDeleteReducer,
} from "./reducers/quizReducers";
import { quizResponseCreateReducer } from "./reducers/quizResponseReducers";

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  quizList: quizListReducer,
  questionList: questionListReducer,
  userRegister: userRegisterReducer,
  quizCreate: quizCreateReducer,
  questionCreate: questionCreateReducer,
  myQuizList: MyQuizListReducer,
  deleteQuiz: quizDeleteReducer,
  quizResponseCreate: quizResponseCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
