// Clave de almacenamiento
const STORAGE_KEY = "users";

// Inicializar con datos simulados si no existe en localStorage
const initialUsers = [
  { id: 1, name: "Juan Pérez", email: "juan@.com" },
  { id: 2, name: "Ana Gómez", email: "ana@test.com" },
  { id: 3, name: "Luna Ramirez", email: "" },
];

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
}

// Obtener usuarios
export const getUsers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Agregar usuario
export const addUser = (user) => {
  const users = getUsers();
  const newUser = { ...user, id: Date.now() };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Editar usuario
export const updateUser = (id, updatedUser) => {
  const users = getUsers().map((u) =>
    u.id === id ? { ...u, ...updatedUser } : u
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Eliminar usuario
export const deleteUser = (id) => {
  const users = getUsers().filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};
