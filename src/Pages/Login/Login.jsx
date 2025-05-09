import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import "./Login.css";

const LoginPage = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear errors on mode switch
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password visibility toggle
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle authentication logic (login/signup)
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { fullname, email, password } = formData;
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }
    if (!isLogin && !fullname) {
      setError("Full Name is required for signup.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? API_PATHS.AUTH.LOGIN : API_PATHS.AUTH.REGISTER;
      const payload = isLogin ? { email, password } : { fullname, email, password };
      const response = await axiosInstance.post(endpoint, payload);

      const { token, user } = response.data;
      if (token && user) {
        updateUser(user);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleAuth}>
        {!isLogin && (
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <div className="password-input">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
            <button type="button" onClick={togglePasswordVisibility} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleAuthMode}>{isLogin ? "Sign Up" : "Login"}</button>
      </p>
    </div>
  );
};

export default LoginPage;