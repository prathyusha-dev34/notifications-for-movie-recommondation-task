import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Backend URL (Render)
      const API_BASE =
        "https://notifications-for-movie-recommendation-djbw.onrender.com";

      // FormData (IMPORTANT for FastAPI OAuth login)
      const formData = new FormData();
      formData.append("username", email);   // backend expects username
      formData.append("password", password);

      const response = await axios.post(
        `${API_BASE}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful 🚀");

      // Redirect to home
      window.location.href = "/";

    } catch (error) {
      console.log("Login Error:", error);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}

          
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;