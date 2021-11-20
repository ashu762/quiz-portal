import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loaders from "../components/Loaders";
import { postQuestion, clearQuestion } from "../actions/quizActions";

import "../index.css";

const PostQuestions = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [correctOption, setCorrectOption] = useState(0);
  const [options, setOptions] = useState([]);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("");
  const dispatch = useDispatch();
  const questionCreate = useSelector((state) => state.questionCreate);
  const { error, loading, questionInfo } = questionCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    if (questionInfo) {
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setHint("");
      setCorrectOption(0);
      dispatch(clearQuestion());
    }
  }, [questionInfo, clearQuestion]);

  const submitform = (e) => {
    e.preventDefault();
    if (
      option1.length === 0 ||
      option2.length === 0 ||
      option3.length === 0 ||
      option4.length === 0
    ) {
      setMessage("Options cannot be empty");
      return;
    }
    if (correctOption < 0 || correctOption >= 4) {
      setMessage("Please enter a option between 0 to 3!");
      return;
    }
    const arr = [];
    arr.length = 0;
    arr.push(option1);
    arr.push(option2);
    arr.push(option3);
    arr.push(option4);
    dispatch(postQuestion(question, correctOption, arr, hint));
  };
  const quizCreated = () => {
    history.push("/");
  };
  return (
    <div className="login-form">
      <FormContainer>
        <h1 className="d-flex justify-content-center login add-question">
          Add Question
        </h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && (
          <Message variant="danger">
            Could not post questions. Please try again later
          </Message>
        )}
        {loading && <Loaders />}
        <Form onSubmit={submitform} className="d-flex flex-column">
          <Form.Group controlId="question" className="question-container">
            <Form.Label className="question-label">Question</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Question"
              value={question}
              className="question-input"
              onChange={(e) => setQuestion(e.target.value)}
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="option1" className="question-container">
            <Form.Label className="question-label">Option1</Form.Label>
            <Form.Control
              type="name"
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="option2" className="question-container">
            <Form.Label className="question-label">Option2</Form.Label>
            <Form.Control
              type="name"
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="option3" className="question-container">
            <Form.Label className="question-label">Option3</Form.Label>
            <Form.Control
              type="name"
              placeholder="Option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="option1" className="question-container">
            <Form.Label className="question-label">Option4</Form.Label>
            <Form.Control
              type="name"
              placeholder="Option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="correctOption" className="question-container">
            <Form.Label className="question-label">Correct Option</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Correct Option"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="hint" className="question-container">
            <Form.Label className="question-label">Hint text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="name"
              placeholder="Enter Hint Text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              className="question-input"
              autocomplete="off"
            ></Form.Control>
          </Form.Group>
          <div className="btn-container">
            <Button
              type="submit"
              className="mybutton submit-quiz-btn ml-auto mr-auto pl-4 pr-4"
              variant="info"
            >
              Submit
            </Button>

            <Button
              onClick={quizCreated}
              className="mybutton done-btn ml-auto mr-auto pl-4 pr-4"
              variant="info"
            >
              I am done
            </Button>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PostQuestions;
