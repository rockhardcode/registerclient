import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      window.location.href = "/login"; // Redirects to login
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };  

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setUser(res.data.userId);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
