import { Link } from "react-router-dom";
import { useAuth } from "../../features/auth/auth_context";

const AppLayout = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>FocusTrack</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/dashboard" style={{ color: "#fff" }}>Dashboard</Link>
        </nav>

        <button
          onClick={logout}
          style={{ marginTop: "30px", padding: "8px" }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
