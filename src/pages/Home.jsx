import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirects to the login page
    }
  }, [user, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/employees", formData);
      console.info(res)
      setMessage("Employee added successfully!");
      setFormData({ name: "", email: "", designation: "" }); // Clear form
    } catch (err) {
      console.error("Error adding employee:", err);
      setMessage("Failed to add employee.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full">
      <h1 className="text-2xl font-bold">Welcome {user ? "User" : "Guest"}</h1>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Employee Registration</h2>

        {message && <p className="text-center text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Enter designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Register Employee
          </button>
        </form>
      </div>
    </div>
      {user ? (
        <button
          onClick={() => {
            logout();
            navigate("/login"); // Redirect to login after logout
          }}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default Home;
