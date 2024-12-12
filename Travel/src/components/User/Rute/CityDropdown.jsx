const CityDropdown = ({ options, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={(e) => {
          const selectedCity = options.find(
            (city) => city.id == e.target.value
          );
          onChange(selectedCity); // Kirim objek kota
        }}
        className="mt-1 block w-80 rounded-md bg-sky-500 text-center text-white border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
      >
        <option value="" className="bg-sky-500 text-left text-white">
          Select a city
        </option>
        {options.map((city) => (
          <option
            key={city.id}
            value={city.id} // Tetap menggunakan `id` sebagai value
            className="bg-sky-500 text-white text-left"
          >
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CityDropdown;
