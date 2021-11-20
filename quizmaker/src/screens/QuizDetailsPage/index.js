import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
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
    const userData = JSON.parse(userInfo);

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const data = await axios.get(`/api/quiz/send/${quizDetails._id}`, config);
  };

  const onPriveteClick = async (isPrivate) => {
    const userData = JSON.parse(userInfo);

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
      {/* <Flex alignItems="center">
        <div className="qdpQuizName">{quizDetails?.name}</div>
        <Button
          colorScheme="red"
          variant="solid"
          mx={8}
          className="qdpDeleteButton"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </Flex> */}
      <Box my={8}>
        <div>Subject Name</div>
        <input
          value={subjectName}
          className="subjectInput"
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <PDFDownloadLink
          document={<ResponsePdf report={report} subjectName={subjectName} />}
          fileName="response.pdf"
        >
          {({ blob, url, loading, error }) => {
            return loading ? (
              "Loading"
            ) : (
              <Button mx={8}>Download the test result</Button>
            );
          }}
        </PDFDownloadLink>
      </Box>

      <Button onClick={sendMails} className="sendMail" colorScheme="telegram">
        Send Mails to Everyone for the test
      </Button>

      <div style={{ marginTop: "40px" }}>
        <h2>Make the quiz Private</h2>
        <Button my={6} onClick={() => onPriveteClick(true)}>
          Yes
        </Button>
        <Button my={6} mx={8} onClick={() => onPriveteClick(false)}>
          No
        </Button>
      </div>
    </Box>
  );
}

export default QuizDetailsPage;
