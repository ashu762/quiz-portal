import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

function AddQuestion(props) {
  const { id, token, userId } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} isFullWidth colorScheme="linkedin">
        Add Question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddQuestionModal
              id={id}
              token={token}
              userId={userId}
              onClose={onClose}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function AddQuestionModal(props) {
  const { id, token, userId, onClose } = props;

  const [questionName, setQuestionName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [hint, setHint] = useState("");
  const [correctOption, setCorrectOption] = useState(0);
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
      `/api/question`,
      {
        question: questionName,
        options: arr,
        correctOption: Number(correctOption),
        user: userId,
        quizName: id,
        hint: hint,
      },
      config
    );
    if (data?.data) {
      toast({
        title: "Question is Added successfully",
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
    onClose();
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
        <Button onClick={updateQuestion} colorScheme="teal">
          Add Question
        </Button>
      </Stack>
    </div>
  );
}

export default AddQuestion;
