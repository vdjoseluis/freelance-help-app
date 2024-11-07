import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpFillingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    income: parseFloat(0).toFixed(2),
    expenses: parseFloat(0).toFixed(2),
    box01: parseFloat(0).toFixed(2),
    box02: parseFloat(0).toFixed(2),
    box07: parseFloat(0).toFixed(2),
    box16: parseFloat(0).toFixed(2),
    showAdditionalBoxes: false,
  });

  const [result, setResult] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const income= parseFloat(formData.income);
    const expenses = parseFloat(formData.expenses);
    const box01 = parseFloat(formData.box01);
    const box02 = parseFloat(formData.box02); 
    const box07 = parseFloat(formData.box07);
    const box16 = parseFloat(formData.box16);

    const calcBox01= (income + box01).toFixed(2);
    const calcBox02= (box02 + (expenses+(income-expenses)*0.05)).toFixed(2);
    const calcBox05= (box07 - box16).toFixed(2);

    setResult({
      ...result,
      box01: calcBox01,
      box02: calcBox02,
      box05: calcBox05,
      box13: formData.showAdditionalBoxes ? 0 : (100).toFixed(2),
    })
  };

  const handleOptionTrimester = (e) => {
    e.target.value === "first"
      ? setFormData({
          ...formData,
          box01: "",
          box02: "",
          box07: "",
          box16: "",
          showAdditionalBoxes: false,
        })
      : setFormData({
          ...formData,
          showAdditionalBoxes: e.target.value === "rest",
        });
  };

  const handleCancel = () => {
    console.log(result);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">Ayuda modelo 130 IRPF</h1>
      <p className="my-4 text-justify">
        Escribe los ingresos y gastos de este trimestre. Se generará un
        archivo <strong>pdf</strong> de ayuda para rellenar las casillas del modelo 130 IRPF.
      </p>
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <label htmlFor="income">Ingresos:</label>
          <div>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="input text-right max-w-36"
            />
            <span className="ms-2 text-xl">€</span>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="expenses">Gastos:</label>
          <div>
            <input
              type="number"
              name="expenses"
              value={formData.expenses}
              onChange={handleChange}
              className="input text-right max-w-36"
            />
            <span className="ms-2 text-xl">€</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-12 items-center gap-2">
      <input
            type="radio"
            name="trimester"
            value="first"
            onChange={handleOptionTrimester}
            defaultChecked
          />
          1er Trimestre
          <input
            type="radio"
            name="trimester"
            value="rest"
            className="ms-4 sm:ms-4"
            onChange={handleOptionTrimester}
          />
          2Tr - 3Tr - 4Tr
      </div>

      {formData.showAdditionalBoxes && (
        <>
          <p className="text-justify mt-10 border-t-2 border-gray-600 pt-6 my-6">
            Escribe los siguientes datos de la declaración o declaraciones anteriores, según el caso, necesarios
            para continuar:
          </p>

          <div className="flex flex-col md:flex-row justify-evenly mb-10">
            <div className="flex flex-col gap-4 my-2 border border-gray-800 rounded-2xl p-4 shadow-lg shadow-gray-800">
              <p className="border-b-2 border-gray-800">SOLO TRIMESTRE ANTERIOR</p>
              <label htmlFor="box01">CASILLA 01:</label>
              <div>
                <input
                  type="number"
                  name="box01"
                  value={formData.box01}
                  onChange={handleChange}
                  className="input text-right max-w-36"
                  required
                />
                <span className="ms-2 text-xl">€</span>
              </div>
              <label htmlFor="box02">CASILLA 02:</label>
              <div>
                <input
                  type="number"
                  name="box02"
                  value={formData.box02}
                  onChange={handleChange}
                  className="input text-right max-w-36"
                  required
                />
                <span className="ms-2 text-xl">€</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 my-2 border border-gray-800 rounded-2xl p-4 shadow-lg shadow-gray-800">
              <p className="border-b-2 border-gray-800">SUMA DE TODAS LAS ANTERIORES</p>
              <label htmlFor="box07">CASILLA 07:</label>
              <div>
                <input
                  type="number"
                  name="box07"
                  value={formData.box07}
                  onChange={handleChange}
                  className="input text-right max-w-36"
                  required
                />
                <span className="ms-2 text-xl">€</span>
              </div>
              <label htmlFor="box16">CASILLA 16:</label>
              <div>
                <input
                  type="number"
                  name="box16"
                  value={formData.box16}
                  onChange={handleChange}
                  className="input text-right max-w-36"
                  required
                />
                <span className="ms-2 text-xl">€</span>
              </div>
            </div>
            
          </div>
        </>
      )}

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

export default HelpFillingForm;