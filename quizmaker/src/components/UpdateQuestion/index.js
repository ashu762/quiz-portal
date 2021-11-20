import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Flex, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

import "./updateQuestion.css";

function UpdateQuestion(props) {
  const { question, index, token } = props;

  const [questionName, setQuestionName] = useState(question.question);
  const [option1, setOption1] = useState(question.options[0]);
  const [option2, setOption2] = useState(question.options[1]);
  const [option3, setOption3] = useState(question.options[2]);
  const [option4, setOption4] = useState(question.options[3]);
  const [hint, setHint] = useState(question.hint);
  const [correctOption, setCorrectOption] = useState(question.correctOption);
  const [error, setError] = useState();

  const toast = useToast();

  const updateQuestion = async () => {
    if (correctOption < 0 || correctOption > 3) {
      setError("Correct Option should be between 0 and 3");
      return;
    }
    if (questionName?.length === 0) {
      setError("Question Name cannot be empty!");
      return;
    }
    if (
      option1.length === 0 ||
      option2.length === 0 ||
      option3.length === 0 ||
      option4.length === 0
    ) {
      setError("Options cannot be empty!");
      return;
    }
    const arr = [];
    arr.length = 0;
    arr.push(option1);
    arr.push(option2);
    arr.push(option3);
    arr.push(option4);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `/api/question/update/${question?._id}`,
      {
        question: questionName,
        options: arr,
        correctOption: Number(correctOption),
        user: question.user,
        quizName: question.quizName,
        hint: hint,
      },
      config
    );
    if (data?.data?.success) {
      toast({
        title: "Question is updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please try again after sometime",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteQuestion = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = await axios.get(
      `/api/question/delete/${question?._id}`,
      config
    );

    if (data?.data?.success) {
      toast({
        title: "Question is Deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please try again after sometime",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {error?.length && (
        <div style={{ fontSize: "12px", color: "red" }}>{error}</div>
      )}
      <Stack spacing={2} my={4}>
        <InputGroup>
          <InputLeftAddon children="Question" />
          <Input
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Option 1" />
          <Input value={option1} onChange={(e) => setOption1(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Option 2" />
          <Input value={option2} onChange={(e) => setOption2(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Option 3" />
          <Input value={option3} onChange={(e) => setOption3(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Option 4" />
          <Input value={option4} onChange={(e) => setOption4(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Correct Option" />
          <Input
            type="number"
            min={0}
            max={3}
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Hint" />
          <Input value={hint} onChange={(e) => setHint(e.target.value)} />
        </InputGroup>
        <Flex>
          <Button
            onClick={updateQuestion}
            colorScheme="teal"
            isFullWidth
            mr={2}
          >
            Update
          </Button>
          <Button onClick={deleteQuestion} colorScheme="red" isFullWidth ml={2}>
            Delete
          </Button>
        </Flex>
      </Stack>
    </div>
  );
}
export default UpdateQuestion;
