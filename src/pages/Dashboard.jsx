import { getUsers } from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { logout } = useAuth(); // función de cerrar sesión
  const navigate = useNavigate();

  const users = getUsers();
  const total = users.length;
  const withEmail = users.filter((u) => u.email).length;
  const withoutEmail = total - withEmail;

  const pieData = [
    { name: "Con Email", value: withEmail },
    { name: "Sin Email", value: withoutEmail },
  ];

  const COLORS = ["#4CAF50", "#FF5722"];

  const barData = [
    { name: "Usuarios", Total: total, "Con Email": withEmail, "Sin Email": withoutEmail }
  ];

  const handleLogout = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Tu sesión se cerrará y deberás iniciar nuevamente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      logout(); 
      navigate("/login", { replace: true });
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has salido correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};
 return (
  <div className="dashboard-container">
    <div className="dashboard-header">
      <h2 className="dashboard-title">Bienvenido al Dashboard</h2>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </div>

    {/* gráficas en dos columnas */}
    <div className="dashboard-charts">
      <div className="chart-box">
        <h3>Distribución de Usuarios</h3>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#4CAF50" />
          <Bar dataKey="Con Email" fill="#2196F3" />
          <Bar dataKey="Sin Email" fill="#FF5722" />
        </BarChart>
      </div>

      <div className="chart-box">
        <h3>Proporción de Usuarios</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>

    {/* Tabla */}
    <h3>Listado de Usuarios</h3>
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              No hay usuarios registrados
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email || "Sin email"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    {/* Enlace */}
    <Link to="/users" style={{ display: "block", marginTop: "20px", color: "#4CAF50" }}>
      Ir a Usuarios
    </Link>
  </div>
);
};

export default Dashboard;

