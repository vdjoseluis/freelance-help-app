import express from "express";
import generateInvoice from "./invoice.js";
import helpFillingForm130 from "./helpFillingForm130.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

app.use(express.json());

app.post("/generate-invoice", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://freelance-help-app.vercel.app");
  generateInvoice(req, res);
});

app.post("/help-filling-form130", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://freelance-help-app.vercel.app");
  helpFillingForm130(req, res);
});


app.listen(port, () => {
  console.log(`Servidor escuchando en puerto:${port}`);
});
