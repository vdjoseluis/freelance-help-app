import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const helpFillingForm130 = (req, res) => {
  const { box01, box02, box05, box13 } = req.body;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const serverDir = path.join(__dirname, "server");
  if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir);
  }
  const pdfPath = path.join(serverDir, "form130_output.pdf");

  const doc = new PDFDocument({ margin: 50 });
  const stream = createWriteStream(pdfPath);
  doc.pipe(stream);

  // Variables de layout
  const startX = 100;
  let currentY = 100;
  const colWidths = [200, 200];
  const rowHeight = 30;

  // Encabezado del documento
  doc.fontSize(18).text("Modelo 130 IRPF", startX, 50);
  doc.fontSize(12).text("Ayuda para rellenar las casillas", startX, 70);

  // Encabezado de la tabla
  const headers = ["CASILLA", "IMPORTE"];
  doc.font("Helvetica-Bold").fontSize(12);

  headers.forEach((header, index) => {
    const x = startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0);
    doc.text(header, x, currentY + rowHeight / 4, {
      width: colWidths[index],
      align: "center",
    });
  });

  // Dibujar bordes para el encabezado de la tabla
  headers.forEach((_, index) => {
    const x = startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0);
    doc.rect(x, currentY, colWidths[index], rowHeight).stroke();
  });

  currentY += rowHeight;

  // Crear array de datos con casillas y sus valores
  const dataRows = [
    ["01", box01],
    ["02", box02],
    ["03", box01 - box02],
    ["04", (box01 - box02) * 0.2],
    ["05", box05],
    ["07", (box01 - box02) * 0.2 - box05],
    ["12", (box01 - box02) * 0.2 - box05],
    ["13", box13],
    ["14", (box01 - box02) * 0.2 - box05 - box13],
    ["16", (box01 - box02) * 0.02],
    ["17", (box01 - box02) * 0.2 - box05 - box13 - (box01 - box02) * 0.02],
    ["19", (box01 - box02) * 0.2 - box05 - box13 - (box01 - box02) * 0.02],
  ];

  // Dibujar cada fila de datos con bordes
  doc.font("Helvetica").fontSize(12);
  dataRows.forEach(([casilla, importe]) => {
    const values = [casilla, importe.toFixed(2)];

    values.forEach((value, index) => {
      const x = startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0);

      // Dibujar texto en la celda
      doc.text(value, x, currentY + rowHeight / 4, {
        width: colWidths[index],
        align: "center",
      });

      // Dibujar borde de la celda
      doc.rect(x, currentY, colWidths[index], rowHeight).stroke();
    });
    currentY += rowHeight;
  });

  // Finalizar el PDF
  doc.end();

  // Descargar el PDF cuando esté listo
  stream.on("finish", () => {
    res.download(pdfPath, "form130_output.pdf", (err) => {
      if (err) {
        console.error("Error al descargar el PDF:", err);
        res.status(500).send("Error al descargar el PDF");
      }
    });
  });

  stream.on("error", (error) => {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error al generar el PDF");
  });
};

export default helpFillingForm130;
