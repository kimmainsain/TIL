const BoardButton = ({ onClick, text, color }) => {
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-700",
    green: "bg-green-500 hover:bg-green-700",
    blue: "bg-blue-500 hover:bg-blue-700",
  };

  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded ${colorClasses[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BoardButton;
