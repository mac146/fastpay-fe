import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating wallet...");

    try {
      const res = await fetch("http://127.0.0.1:8000/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Wallet created successfully! ID: ${data.wallet_id || "N/A"}`);
         const userId = data.data[0].id; // grab user ID from the array
         localStorage.setItem("userId", userId);
         localStorage.setItem("walletId", data.wallet_id);
        setFormData({ fullname: "", email: "", password: "" });
        setTimeout(() => navigate("/wallet"), 1500);
      } else {
        setMessage(data.detail || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  return (
    <div
      className="background"
      style={{
        height: "100vh",
        background: "linear-gradient(45deg, #ffffff, #a8e0ff)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px", // spacing between elements
      }}
    >
      {/* FastPay */}
      <h1
        style={{
          fontSize: "3rem",
          color: "#040e16ff",
          fontWeight: "bold",
        }}
      >
        FastPay
      </h1>

      {/* Welcome */}
      <h2
        style={{
          fontSize: "2rem",
          color: "#333",
        }}
      >
        Welcome
      </h2>

      {/* Signup container */}
      <div
        style={{
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <h2>SIGNUP</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#4db6ff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create Wallet
          </button>
        </form>
        <p style={{ marginTop: "10px", color: "#333" }}>{message}</p>
      </div>
    </div>
  );
}

export default Signup;
