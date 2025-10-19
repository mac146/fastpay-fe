import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const [walletData, setWalletData] = useState({
    wallet_id: "",
    balance: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user_Id = localStorage.getItem("userId"); // Get saved user ID

  useEffect(() => {
    if (!user_Id) {
      setError("User not found. Please signup first.");
      setLoading(false);
      return;
    }

    const fetchWallet = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/wallet/user/${user_Id}`);
        const data = await res.json();

        if (res.ok) {
          setWalletData({
            wallet_id: data.wallet_id || "",
            balance: data.balance || 0,
            transactions: data.transactions || [],
          });
        } else {
          setError(data.detail || "Failed to fetch wallet");
        }
      } catch (err) {
        setError("Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [user_Id]);

  if (loading) return <p>Loading wallet...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const { wallet_id, balance, transactions = [] } = walletData;

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
      <h1 style={{ fontSize: "2.5rem", color: "#4db6ff" }}>Your Wallet</h1>

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
        <p>
          <strong>USER ID:</strong> {user_Id}
        </p>
        <p>
          <strong>Balance:</strong> ₹{balance}
        </p>

        <h3 style={{ marginTop: "20px" }}>Transactions</h3>
        <ul style={{ textAlign: "left", maxHeight: "150px", overflowY: "auto" }}>
          {transactions.length > 0 ? (
            transactions.map((txn, idx) => (
              <li key={idx}>
                {txn.type} ₹{txn.amount} — {new Date(txn.date).toLocaleString()}
              </li>
            ))
          ) : (
            <li>No transactions yet</li>
          )}
        </ul>
      </div>

      <button
        onClick={() => navigate("/transaction")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4db6ff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Go to Transactions
      </button>
    </div>
  );
}

export default Wallet;
