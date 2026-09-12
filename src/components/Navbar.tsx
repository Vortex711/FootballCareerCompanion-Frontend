import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <button
          onClick={() => navigate("/careers")}
          className="
            flex items-center gap-3
            text-left
            transition
            hover:opacity-80
          "
        >
          <div
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              bg-emerald-500/10
              text-lg
            "
          >
            ⚽
          </div>

          <div>
            <p className="text-sm font-bold text-slate-100">
              Football Career Companion
            </p>

            <p className="text-xs text-slate-500">
              Your career. Your story.
            </p>
          </div>
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <button
            onClick={() => navigate("/careers")}
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium text-slate-300
              transition
              hover:bg-slate-800
              hover:text-emerald-400
            "
          >
            Careers
          </button>

          <button
            onClick={handleLogout}
            className="
              rounded-lg
              px-4 py-2
              text-sm font-medium text-slate-400
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;