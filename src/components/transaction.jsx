import React, { useState } from "react";

function Transaction() {
  const [formData, setFormData] = useState({ recipient: "", amount: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("Processing transaction...");

    try {
      const res = await fetch("http://localhost:8000/send-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Sent ₹${formData.amount} to wallet ${formData.recipient}`);
        setFormData({ recipient: "", amount: "" });
      } else {
        setMessage(data.detail || "Transaction failed");
      }
    } catch (err) {
      setMessage("Network error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(45deg, #ffffff, #a8e0ff)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#4db6ff" }}>
        Send Money
      </h1>

      <div
        style={{
          padding: "24px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          width: "350px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <form onSubmit={handleSend}>
          <input
            type="text"
            name="recipient"
            placeholder="Recipient Wallet ID"
            value={formData.recipient}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
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
            Send Money
          </button>
        </form>
        <p style={{ marginTop: "10px", color: "#333" }}>{message}</p>
      </div>
    </div>
  );
}

export default Transaction;
