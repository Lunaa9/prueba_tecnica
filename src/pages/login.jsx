import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";
import Swal from "sweetalert2";

const login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  login(email, password);

  Swal.fire({
    icon: "success",
    title: "Bienvenido",
    text: `Hola ${email}, tu sesión ha iniciado correctamente.`,
    timer: 2000,
    showConfirmButton: false,
  });
};

  return (
    //Formulario de inicio de sesion 
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
