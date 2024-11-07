import express from "express";
import cors from "cors";
import generateInvoice from "./invoice.js";
import helpFillingForm130 from "./helpFillingForm130.js";

const app = express();
const port = 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://freelance-help-app.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

app.post("/generate-invoice", generateInvoice);
app.post("/help-filling-form130", helpFillingForm130);

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto:${port}`);
});
