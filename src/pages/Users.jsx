import { useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../services/UserService";
import Swal from "sweetalert2";
import "../styles/Users.css";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState(getUsers());
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //funcion buscar
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
 //Alerta de actualizacion 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, form);
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "Los datos se guardaron correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      setEditingId(null);
      //Alerta de registro
    } else {
      addUser(form);
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        text: "El usuario fue registrado exitosamente",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    setForm({ name: "", email: "" });
    setUsers(getUsers());
  };
  //Edicion de datos

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
    Swal.fire({
      icon: "info",
      title: "Modo edición",
      text: "Ahora puedes actualizar los datos del usuario",
      timer: 2000,
      showConfirmButton: false,
    });
  };
  //alerta de eliminar

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        setUsers(getUsers());
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El usuario fue eliminado correctamente",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

 return (
    <div className="users-container">
      <Link to="/dashboard" className="back-link">
        ← Volver al Dashboard
      </Link>
      <h2 className="users-title">Gestión de Usuarios</h2>

      {/*buscar*/}
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="users-search"
      />

      {/*formulario*/}
      <form onSubmit={handleSubmit} className="users-form">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="users-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="users-input"
          required
        />
        <button type="submit" className="users-button">
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>

      {/*tabla*/}
      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td className="users-actions">
                  <button className="edit" onClick={() => handleEdit(u)}>Editar</button>
                  <button className="delete" onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
