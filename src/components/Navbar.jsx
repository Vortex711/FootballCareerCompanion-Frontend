import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <button onClick={() => navigate("/careers")}>Careers</button>
      </div>

      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;