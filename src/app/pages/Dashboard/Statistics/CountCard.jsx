const CountCard = ({ label, color, count, Icon = null }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        {Icon ? (
          <Icon />
        ) : (
          <div
            className={`size-5 rounded-sm`}
            style={{ backgroundColor: color }}
          ></div>
        )}

        {label}
      </div>

      <span>{count || 0}</span>
    </div>
  );
};

export default CountCard;
