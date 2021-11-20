import React, { useState, useEffect } from "react";
import { Card, Alert, Container } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { add } from "../actions/My";
import { Form, Button } from "react-bootstrap";
import { Loader } from "semantic-ui-react";

import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import Message from "../components/Message";
import Loaders from "../components/Loaders";
import { login } from "../actions/userActions";
const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  const submitform = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <div className="login-form">
      <FormContainer>
        <h1 className="d-flex justify-content-center login ">LOG IN!</h1>
        {error && (
          <Message variant="danger">
            Server error. Please try again later
          </Message>
        )}
        {loading && <Loader active inline="centered" />}
        <Form onSubmit={submitform} className="d-flex flex-column">
          <Form.Group controlId="email">
            <Form.Label> Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            className="mybutton ml-auto mr-auto pl-4 pr-4"
            variant="info"
          >
            Submit
          </Button>
        </Form>
        <a href="#" className="d-flex justify-content-end mt-2">
          Forgot Password
        </a>
        <div className="d-flex justify-content-center mt-4">
          Don't Have an account
          <a href="/register" className="ml-3">
            Register
          </a>
        </div>
      </FormContainer>
    </div>
  );
};

export default LoginPage;
