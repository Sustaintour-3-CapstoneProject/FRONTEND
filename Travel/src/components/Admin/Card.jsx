const Card = ({ title, totalData, icon, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg border border-[#D4D4D4] w-full ${className}`}
      {...props}
    >
      <div className="p-6 flex flex-row items-start gap-5">
        {icon}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="font-bold text-3xl">{totalData}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
