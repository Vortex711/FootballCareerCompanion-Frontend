import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="
        inline-flex items-center gap-2
        rounded-lg
        px-3 py-2
        text-sm font-medium
        text-slate-400
        transition
        hover:bg-slate-800
        hover:text-slate-100
      "
    >
      <span>←</span>
      <span>Back</span>
    </button>
  );
}

export default BackButton;