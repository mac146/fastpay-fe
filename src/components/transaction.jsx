import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Transaction() {
  const [formData, setFormData] = useState({ recipient: "", amount: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
const handleSend = async (e) => {
  e.preventDefault();
  setMessage("Processing transaction...");

  const senderId = localStorage.getItem("userId");
  if (!senderId) {
    setMessage("User not found. Please signup first.");
    return;
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/transaction/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from_user: senderId,
        to_user: formData.recipient,
        amount: Number(formData.amount),
        type: "transfer",   // must be 'add-funds' or 'transfer'
        status: "success"   // must be 'success' or 'failed'
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`Sent ₹${formData.amount} to ${formData.recipient}`);
      setFormData({ recipient: "", amount: "" });
    } else {
      setMessage(JSON.stringify(data));
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
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#4db6ff" }}>Send Money</h1>

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

      <button
        onClick={() => navigate("/wallet")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4db6ff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Back to Wallet
      </button>
    </div>
  );
}

export default Transaction;
