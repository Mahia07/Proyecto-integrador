import React, { useState } from "react";
import { registerUser } from "../../Api/api";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    role: "Cliente",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await registerUser(formData);
      setSuccess(true);
      navigate("/login");
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  const handleAdminClick = () => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, role: "Admin" };
      localStorage.setItem("role", updatedData.role);
      return updatedData;
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Registro</h2>

        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Teléfono"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Usuario registrado con éxito!</p>}

        <button type="submit" className="submit-button">Registrarse</button>

        <p className="admin-link" onClick={handleAdminClick}>
          ¿Eres Administrador?
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
