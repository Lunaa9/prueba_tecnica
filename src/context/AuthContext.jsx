import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // simulacion login
    if (email === "prueba@gmail.com" && password === "123456") {
      setUser({ email });
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
       Swal.fire({
        icon: "warning",
        title: "Incorrecto",
        text: "Credenciales incorrectas",
        timer: 2000,
        showConfirmButton: false,
        });
    }

    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);