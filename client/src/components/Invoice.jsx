import { useState } from "react";
import DataFormCard from "./DataFormCard";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalName: "",
    personalNif: "",
    personalAddress: "",
    personalPhone: "",
    personalEmail: "",
    customerName: "",
    customerNif: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",
    date: new Date().toISOString().substring(0, 10),
    numInvoice: "",
    amount: parseFloat(0).toFixed(2),
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Generar factura</h1>
      <div className="flex justify-evenly items-center ">
        <div className="flex flex-col">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date">No. factura:</label>
          <input
            type="text"
            name="numInvoice"
            value={formData.numInvoice}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>
      <DataFormCard
        title={"Tus datos:"}
        formData={formData}
        handleChange={handleChange}
        suffix="personal"
      />
      <DataFormCard
        title={"Datos del cliente:"}
        formData={formData}
        handleChange={handleChange}
        suffix="customer"
      />
      <div className="flex justify-center my-4">
        Concepto:
        <textarea
          name="description"
          className="input w-full h-16 max-h-32"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <label
        htmlFor="amount"
        className="flex justify-center gap-4 mb-6 text-lg font-semibold"
      >
        Importe bruto:
        <input
          type="number"
          name="amount"
          className="input text-right"
          onChange={handleChange}
          value={formData.amount}
          required
        />{" "}
        €
      </label>

      <div className="flex justity-between gap-10 justify-center">
        <input
          type="submit"
          value="Aceptar"
          className="w-32 py-2 rounded-xl bg-green-600 text-white hover:bg-green-400 hover:text-gray-900 font-semibold shadow-md shadow-gray-800 transition duration-300"
        />
        <input
          type="reset"
          value="Cancelar"
          className="w-32 py-2 bg-red-600 rounded-xl text-white font-semibold shadow-md shadow-gray-800 hover:bg-red-500 hover:text-gray-900 transition duration-300"
          onClick={handleCancel}
        />
      </div>
    </form>
  );
};

export default Invoice;
