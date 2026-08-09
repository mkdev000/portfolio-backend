require("dotenv").config();

const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

app.post("/contact", async (req, res) => {

  const { name, email, message } = req.body;

  try {

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject: `Nuevo mensaje de ${name}`,

      html: `
        <h2>Nuevo mensaje desde el portfolio</h2>

        <p><strong>Nombre:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Mensaje:</strong></p>

        <p>${message}</p>
      `,

    });

    res.json({
      message: "Correo enviado correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error al enviar el correo."
    });

  }

});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});