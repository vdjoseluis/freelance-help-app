import express from "express";
import pkg from "body-parser";
import generateInvoice from "./invoice.js";
import helpFillingForm130 from "./helpFillingForm130.js";

const app = express();
const port = 3000;

const { json } = pkg;

app.use(json());

app.post("/generate-pdf", generateInvoice);
app.post("/help-filling-form130", helpFillingForm130);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
