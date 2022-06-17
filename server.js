const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dogan.saglam94@gmail.com",
      pass: "akdadiqcarcborcu",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "info@imdawn.me",
    subject: req.body.subject.toUpperCase(),
    text: `From: ${req.body.email}\n\n${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent");
      res.json({ status: "success" });
    }
  });
});

app.listen(PORT, (res, err) => {
  if (err) {
    console.log("Server failed.");
  } else {
    `Listening at ${PORT}.`;
  }
});
