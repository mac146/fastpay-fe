import React, { useState } from "react";
function Signup(){
    const [formData, setFormData] = useState({ fullname: "", email: "", password: ""  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating wallet...");

    try {
      const res = await fetch("http://127.0.0.1:8000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Wallet created successfully! ID: ${data.wallet_id || "N/A"}`);
        setFormData({ fullname: "", email: "" ,password: ""});
      } else {
        setMessage(data.detail || "Something went wrong");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };
    return(
        <div
      className="background"
      style={{
        height: "100vh",            
        backgroundColor: "#f0f4f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2>FastPay Wallet</h2>
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
              backgroundColor: "#4CAF50",
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
    )
}
export default Signup;