import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Admin Panel</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link
          to="/admin"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/admin/users"
          style={{ color: "white", textDecoration: "none" }}
        >
          Users
        </Link>

        <Link
          to="/admin/reviews"
          style={{ color: "white", textDecoration: "none" }}
        >
          Reviews
        </Link>
      </nav>
    </div>
  );
}

export default AdminSidebar;