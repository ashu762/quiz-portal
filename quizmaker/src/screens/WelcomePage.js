import React from "react";
import { Container } from "react-bootstrap";
import QuizComponent from "../components/QuizComponent";
import "../index.css";
const WelcomePage = () => {
  return (
    <Container>
      <div className="quiz-container">
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
        <QuizComponent></QuizComponent>
      </div>
    </Container>
  );
};

export default WelcomePage;
