import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const generateInvoice = (req, res) => {
  const {
    date,
    numInvoice,
    amount,
    description,
    personalName,
    personalNif,
    personalAddress,
    personalPhone,
    personalEmail,
    customerName,
    customerNif,
    customerAddress,
    customerPhone,
    customerEmail,
  } = req.body;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const serverDir = path.join(__dirname, "server");
  if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir);
  }
  const pdfPath = path.join(serverDir, "invoice.pdf");

  const doc = new PDFDocument({ margin: 50 });
  const stream = createWriteStream(pdfPath);
  doc.pipe(stream);

  // Layout básico
  const startX = 80;
  let currentY = 70;
  const rowHeight = 25;
  const colWidths = [350, 100]; // Ancho para Concepto e Importe

  // Título de la factura
  doc.fontSize(18).font("Helvetica-Bold").text("Factura", startX, currentY);
  currentY += 30;

  // Información de la empresa y del cliente
  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text(`${personalName}`, startX, currentY);
  doc.fontSize(12).font("Helvetica");
  doc.text(`Factura Nº: ${numInvoice}`, startX + colWidths[0], currentY);
  currentY += 20;
  doc.text(`NIF/CIF: ${personalNif}`, startX, currentY);
  doc.text(`Fecha: ${formatDate(date)}`, startX + colWidths[0], currentY);
  currentY += 20;
  doc.text(`${personalAddress}`, startX, currentY);
  currentY += 20;
  doc.text(`Tel: ${personalPhone}`, startX, currentY);
  currentY += 20;
  doc.text(`Email: ${personalEmail}`, startX, currentY);
  currentY += 40;

  // Información del cliente
  doc.font("Helvetica-Bold").text("CLIENTE:", startX, currentY);
  currentY += 20;
  doc.text(`${customerName}`, startX, currentY);
  currentY += 20;
  doc.font("Helvetica");

  doc.text(`NIF/CIF: ${customerNif}`, startX, currentY);
  currentY += 20;
  doc.text(`${customerAddress}`, startX, currentY);
  currentY += 20;
  doc.text(`Tel: ${customerPhone}`, startX, currentY);
  currentY += 20;
  doc.text(`Email: ${customerEmail}`, startX, currentY);
  currentY += 50;

  // Encabezado de la tabla (Concepto e Importe)
  doc.font("Helvetica-Bold").fontSize(12);
  ["Concepto", "Importe"].forEach((header, i) => {
    const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
    doc.text(header, x, currentY + rowHeight / 4, {
      width: colWidths[i],
      align: "center",
    });
  });

  // Bordes para el encabezado
  const tableWidth = colWidths.reduce((acc, w) => acc + w, 0);
  doc.rect(startX, currentY, tableWidth, rowHeight).stroke();
  currentY += rowHeight;

  // Campo "Concepto" sin bordes internos
  doc.font("Helvetica").fontSize(12);
  doc.text(description, startX + 5, currentY + 5, {
    width: colWidths[0] - 10,
    align: "left",
    lineBreak: true,
  });

  // Importe alineado a la derecha
  doc.text(amount.toFixed(2) + " €", startX + colWidths[0], currentY + 5, {
    width: colWidths[1],
    align: "right",
  });

  // Añadir el borde vertical separador entre las columnas
  const separatorX = startX + colWidths[0];
  doc
    .moveTo(separatorX, currentY)
    .lineTo(separatorX, currentY + rowHeight * 3) // Desde la parte superior hasta la parte inferior de la fila
    .stroke();

  // Borde exterior de la tabla
  doc.rect(startX, currentY, tableWidth, rowHeight * 3).stroke();
  currentY += rowHeight * 4;

  // Subtotal, IVA, y Total
  const subtotal = parseFloat(amount).toFixed(2);
  const iva = (amount * 0.21).toFixed(2);
  const total = (parseFloat(subtotal) + parseFloat(iva)).toFixed(2);

  doc.font("Helvetica-Bold");
  doc.text("Subtotal", startX, currentY, {
    width: colWidths[0],
    align: "right",
  });
  doc.text(subtotal + " €", startX + colWidths[0], currentY, {
    width: colWidths[1],
    align: "right",
  });
  currentY += rowHeight;

  doc.text("IVA (21%)", startX, currentY, {
    width: colWidths[0],
    align: "right",
  });
  doc.text(iva + " €", startX + colWidths[0], currentY, {
    width: colWidths[1],
    align: "right",
  });
  currentY += rowHeight;

  doc.text("Total", startX, currentY, {
    width: colWidths[0],
    align: "right",
  });
  doc.text(total + " €", startX + colWidths[0], currentY, {
    width: colWidths[1],
    align: "right",
  });
  currentY += rowHeight;

  doc.end();

  stream.on("finish", () => {
    res.download(pdfPath, "invoice.pdf", (err) => {
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

export default generateInvoice;
