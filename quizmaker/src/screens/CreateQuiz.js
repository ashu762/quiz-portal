import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loaders from "../components/Loaders";

import { postQuiz } from "../actions/quizActions";

import FormContainer from "../components/FormContainer";

import "../index.css";
import { Checkbox } from "@chakra-ui/checkbox";

const CreateQuiz = ({ history }) => {
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const quizCreate = useSelector((state) => state.quizCreate);
  const { error, loading, quizInfo } = quizCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    if (quizInfo) history.push(`/create/${quizInfo.id}`);
  }, [quizInfo]);

  const submitform = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setMessage("Please Enter A valid Quiz name!!");
      return;
    }
    if (author.length === 0) {
      setMessage("Please Enter A valid Author name!!");
      return;
    }
    if (description.length < 10) {
      setMessage("Please Enter A Description of more than 10 characters!!");
      return;
    }
    dispatch(postQuiz(name, author, description, isPrivate));
  };
  return loading ? (
    <Loaders></Loaders>
  ) : error ? (
    <Message variant="danger">
      Could not connect to server. Please try again later
    </Message>
  ) : (
    <div className="login-form">
      <FormContainer>
        <h1 className="d-flex justify-content-center login ">
          Create Your Quiz
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}

        {loading && <Loaders />}
        <Form onSubmit={submitform} className="d-flex flex-column">
          <Form.Group controlId="name">
            <Form.Label>Quiz Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Quiz Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="name"
              placeholder="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div className="privateQuiz" style={{ marginRight: "30px" }}>
              Do you want to make the quiz Private?
            </div>
            <Checkbox
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            >
              Yes
            </Checkbox>
          </div>

          <Button
            type="submit"
            className="mybutton ml-auto mr-auto pl-4 pr-4"
            variant="info"
          >
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default CreateQuiz;
