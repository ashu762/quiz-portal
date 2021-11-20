import nodemailer from "nodemailer";
const defaultMailingList = "uncreatedfool@gmail.com";
const senderEmail = "uncreatedproject762@gmail.com";
const senderPassword = "Ashu@123"; // gmail app password

export const sendMail = async (quizName, report) => {
  const subject = `Marks of the test ${quizName}`;

  const text = `You have scored ${report.totalCorrect} marks out of ${report.totalMarks} in the ${quizName} test`;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const message = {
      from: `report sender <${senderEmail}>`,
      to: report.emailId,
      subject,
      text,
    };

    transporter.sendMail(message, () => {});
  } catch (e) {
    // handle errors here
  }
};

export const sendMails = async (generatedReport, quizName) => {
  for (const report of generatedReport) {
    await sendMail(quizName, report);
  }
};
