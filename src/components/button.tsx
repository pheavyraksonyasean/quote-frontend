interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        px-4 
        py-3 
        font-semibold 
        font-mono
        text-white 
        bg-[#bd6868]
        rounded-lg 
        shadow-md
        hover:bg-[#9D5151]
        focus:outline-none 
        focus:ring-2 
        focus:ring-indigo-500 
        focus:ring-opacity-75
        transition-colors
        duration-300
      "
    >
      New Quote
    </button>
  );
};

export default Button;