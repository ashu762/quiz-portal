import { Divider, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";

import "./timePicker.css";

import "react-calendar/dist/Calendar.css";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { Checkbox } from "semantic-ui-react";

function TimePicker(props) {
  const { id, token } = props;

  const [initialTime, setInitialTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [error, setError] = useState();

  const [isTimedQuiz, setIsTimedQuiz] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const data = await axios.get(`/api/quiz/data/${id}`, config);
      setInitialTime(Date.parse(data?.data?.startTime));
      setEndTime(Date.parse(data?.data?.endTime));
      setIsTimedQuiz(data?.data?.isTimedQuiz);
    };

    fetchData();
  }, []);

  const onUpdateClick = async () => {
    if (endTime < initialTime) {
      setError("End Time cannot be less than starting time!");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const data = await axios.post(
      `/api/quiz/update/time/${id}`,
      {
        isTimedQuiz,
        startTime: initialTime,
        endTime: endTime,
      },
      config
    );
    if (data?.data?.success) {
      toast({
        title: "Time is updated successfully",
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
    <Flex mt={16} flexDirection="column">
      <Flex>
        <Text fontSize="large" fontWeight="bold" mb={4} mr={8}>
          Do you want to make the Quiz a timed quiz
        </Text>
        <Checkbox
          checked={isTimedQuiz}
          onChange={(e) => setIsTimedQuiz(e.target.checked)}
        ></Checkbox>
      </Flex>

      {error?.length > 0 && (
        <Text colorScheme="red" color="red" fontSize={14}>
          {error}
        </Text>
      )}
      <Divider height="3px" colorScheme="cyan" mb={10} />

      <Flex mt={4} justifyContent="space-between">
        <Flex flexDir="column">
          <Text mb={4}>Choose Start Date and Time</Text>

          <DateTimePicker
            onChange={setInitialTime}
            value={initialTime}
            minDate={new Date()}
          />
        </Flex>
        <Flex flexDir="column">
          <Text mb={4}>Choose End Date and Time</Text>
          <DateTimePicker
            onChange={setEndTime}
            value={endTime}
            minDate={new Date()}
          />
        </Flex>
      </Flex>
      <Button mt={6} onClick={onUpdateClick}>
        Update the Date and Time
      </Button>
    </Flex>
  );
}

export default TimePicker;
