export const generateReportHelper = (questions, reponses) => {
  const generatedArray = [];

  for (const response of reponses) {
    const entry = {};
    entry.name = response.name;
    entry.emailId = response.emailId;
    entry.rollNumber = getRollNumber(response.emailId);
    entry.totalMarks = questions.length;
    entry.totalCorrect = getTotalCorrect(questions, response.quizResponse);
    generatedArray.push(entry);
  }

  return generatedArray;
};

function getRollNumber(emailId) {
  return emailId.split("@")[0].toUpperCase();
}

function getTotalCorrect(questions, quizResponse) {
  let ans = 0;

  for (const response of quizResponse) {
    const questionId = response.questionId;
    const index = response.index;

    const question = search(questionId, questions);

    if (question?.correctOption === index) ans++;
  }
  return ans;
}

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i]._id.toString() === nameKey.toString()) {
      return myArray[i];
    }
  }
}
