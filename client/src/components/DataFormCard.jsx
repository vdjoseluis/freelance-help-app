import PropTypes from "prop-types";

const DataFormCard = ({title, formData, handleChange, suffix}) => {
  return (
    <section className="flex flex-col border border-gray-800 rounded-2xl p-2 my-2 shadow-lg shadow-gray-800">
      <div className="w-[90%] sm:w-[75%] mx-auto">
        <p className="text-xl font-bold text-left ">{title}</p>
        <div className="flex flex-col sm:flex-row justify-between mb-2">

        <label className="flex flex-col text-left sm:w-[60%]">
          Nombre o razón social:
          <input type="text" name={`${suffix}Name`} className="input" value={formData.name} onChange={handleChange} required/>
        </label>
        <label className="flex flex-col text-left sm:w-[30%]">
          NIF/CIF:
          <input type="text" name={`${suffix}Nif`} className="input" value={formData.nif} onChange={handleChange} required/>
        </label>
        </div>
        <label className="flex flex-col text-left mb-2">
          Dirección:
          <input type="text" name={`${suffix}Address`} className="input" value={formData.address} onChange={handleChange} required/>
        </label>

        <div className="flex flex-col sm:flex-row justify-between mb-2">
          <label className="flex flex-col text-left sm:w-[30%]">
            Teléfono:
            <input type="tel" name={`${suffix}Phone`} className="input" value={formData.phone} onChange={handleChange} required/>
          </label>
          <label className="flex flex-col text-left sm:w-[60%]">
            Email:
            <input type="email" name={`${suffix}Email`} className="input" value={formData.email} onChange={handleChange} required/>
          </label>
        </div>
      </div>
    </section>
  );
};

DataFormCard.propTypes = {
  title: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  suffix: PropTypes.string
}

export default DataFormCard;
