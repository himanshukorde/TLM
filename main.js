// server.js
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/sendMail", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "mail.tlminsidesales.co.in",  // your domain mail server
      port: 465,
      secure: true,
      auth: {
        user: "info@tlminsidesales.co.in",
        pass: "your-email-password"  // Use app password if 2FA enabled
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "info@tlminsidesales.co.in",
      subject: `New Contact from ${name}`,
      text: message,
    });

    res.status(200).send({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
