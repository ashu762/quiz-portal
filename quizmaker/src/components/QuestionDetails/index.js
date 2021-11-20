import { TabList, Tabs } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UpdateQuestion from "../UpdateQuestion";
import { TabPanels, TabPanel, Tab } from "@chakra-ui/react";

import "./questionDetails.css";

function QuestionDetails(props) {
  const { id, token } = props;

  const [questions, setQuestions] = useState();

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.get(`/api/quiz/${id}`, config);
      setQuestions(data.data);
    }

    fetchData();
  }, []);
  if (!questions) return null;

  return (
    <div className="tabsContainer">
      <h2
        style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "25px" }}
      >
        Update Questions
      </h2>

      <Tabs>
        <TabList>
          {questions?.map((question, index) => {
            return <Tab>Question {index + 1}</Tab>;
          })}
        </TabList>
        <TabPanels>
          {questions?.map((question, index) => {
            return (
              <TabPanel>
                <UpdateQuestion
                  question={question}
                  index={index}
                  token={token}
                />
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
    </div>
  );
}
export default QuestionDetails;
