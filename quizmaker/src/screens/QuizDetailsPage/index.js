import { Box, Divider, Flex } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import NoAccessPage from "../../components/NoAccessPage";

import { deleteMyQuiz, generateReport } from "../../actions/quizActions";

import "./quizDetailsPage.css";
import { useEffect } from "react";
import ResponsePdf from "../../components/ResponsePdf/ResponsePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ConeStriped } from "react-bootstrap-icons";
import axios from "axios";
import QuestionDetails from "../../components/QuestionDetails";
import AddQuestion from "../../components/AddQuestion";
import TimePicker from "../../components/TimePicker";

function QuizDetailsPage() {
  const userInfo = localStorage.getItem("userInfo");

  const location = useLocation();
  const quizDetails = location?.state;

  const [subjectName, setSubjectName] = useState();

  const history = useHistory();
  const dispatch = useDispatch();

  const isValidUser = userInfo?.id === quizDetails?.user;

  const deleteQuiz = useSelector((state) => state.deleteQuiz);

  const report = useSelector((state) => state?.quizReport?.report?.report);

  const { success } = deleteQuiz;

  const [quizResponseData, setQuizResponseData] = useState();
  const userData = JSON.parse(userInfo);

  const toast = useToast();

  useEffect(() => {
    dispatch(generateReport(quizDetails?._id));
  }, []);

  useEffect(() => {
    if (success) {
      history.replace({
        pathname: "/",
        state: {
          deleted: true,
        },
      });
    }
  }, [success]);

  if (isValidUser) {
    return (
      <>
        <NoAccessPage />
      </>
    );
  }

  const deleteHandler = () => {
    dispatch(deleteMyQuiz(quizDetails?._id));
  };

  const sendMails = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const data = await axios.get(`/api/quiz/send/${quizDetails._id}`, config);

    if (data?.data?.success) {
      toast({
        title: "Mail is succesfully sent to everyone",
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

  const onPriveteClick = async (isPrivate) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const data = await axios.post(
      `/api/quiz/update/${quizDetails._id}`,
      { isPrivate },
      config
    );
  };

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="16" id="box">
      <Box mt={8} mb={4}>
        <PDFDownloadLink
          document={
            <ResponsePdf report={report} subjectName={quizDetails.name} />
          }
          fileName="response.pdf"
        >
          {({ blob, url, loading, error }) => {
            return loading ? (
              "Loading"
            ) : (
              <Button>Download the test result</Button>
            );
          }}
        </PDFDownloadLink>
      </Box>

      <Divider mb={2} />

      <Button
        onClick={sendMails}
        className="sendMail"
        colorScheme="telegram"
        mb={4}
      >
        Send Mails to Everyone for the test
      </Button>

      <Divider mb={8} />

      <div style={{ marginTop: "20px" }}>
        <h2>Make the quiz private</h2>
        <Button my={6} onClick={() => onPriveteClick(true)}>
          Yes
        </Button>
        <Button my={6} mx={8} onClick={() => onPriveteClick(false)}>
          No
        </Button>
      </div>

      <Divider my={3} />
      <Box mt={4}>
        <QuestionDetails id={quizDetails._id} token={userData.token} />
      </Box>

      <Box mx={4}>
        <AddQuestion
          id={quizDetails._id}
          token={userData.token}
          userId={userData?._id}
        />
      </Box>
      <Box mx={4}>
        <TimePicker
          id={quizDetails._id}
          token={userData.token}
          userId={userData?._id}
        />
      </Box>
    </Box>
  );
}

export default QuizDetailsPage;
