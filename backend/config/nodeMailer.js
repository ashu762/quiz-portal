import nodemailer from "nodemailer";
const defaultMailingList = "uncreatedfool@gmail.com";
const senderEmail = "uncreatedproject762@gmail.com";
const senderPassword = "Ashu@123"; // gmail app password

export const sendMail = async (subject, text, to = defaultMailingList) => {
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
      to,
      subject,
      text: subject,
      html: text,
    };

    transporter.sendMail(message, () => {});
  } catch (e) {
    // handle errors here
  }
};
