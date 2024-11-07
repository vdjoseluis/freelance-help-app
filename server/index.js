import express from "express";
import generateInvoice from "./invoice.js";
import helpFillingForm130 from "./helpFillingForm130.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["https://freelance-help-app.vercel.app/"];
app.use(cors({
  origin: allowedOrigins,
  methods: "POST",
  credentials: true
}));

app.use(express.json());

app.post("/generate-invoice", generateInvoice);
app.post("/help-filling-form130", helpFillingForm130);

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto:${port}`);
});
