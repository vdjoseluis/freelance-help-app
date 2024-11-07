import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    const handleClick = (path) => () => navigate(`/${path}`);
  return (
    <section className="border border-gray-800 rounded-2xl shadow-lg shadow-gray-800 p-10">
      <h1 className="text-3xl font-bold">Autogestión para autónomos</h1>
      <p className="my-10 text-justify">
        Aplicación de ayuda que genera documentos para pequeños empresarios autónomos <strong>(no agrarios)</strong> que
        quieran realizar ellos mismos sus declaraciones y facturas.
      </p>
      <div className="w-[40%] mx-auto flex flex-col my-10 gap-20">
        <button onClick={handleClick('invoice')} className="text-xl">
          <span className="button_top">Generar factura</span>
        </button>
        <button onClick={handleClick('helpFilling')} className="text-xl">
          <span className="button_top">Ayuda Modelo 130 IRPF</span>
        </button>
      </div>
      <p className="my-10 text-justify">
        <strong>Importante:</strong> No sustituye a los servicios administrativos profesionales pero puede
        ser útil si se sabe manejar.
      </p>
    </section>
  )
}

export default Home
