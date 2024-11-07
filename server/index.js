import express from "express";
import pkg from "body-parser";
import generateInvoice from "./invoice.js";
import helpFillingForm130 from "./helpFillingForm130.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({origin: "http://localhost:5173"}));

const { json } = pkg;

app.use(json());
app.use(express.json());

app.post("/generate-invoice", generateInvoice);
app.post("/help-filling-form130", helpFillingForm130);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
