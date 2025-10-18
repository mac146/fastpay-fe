import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Wallet (){
    const [walletData, setWalletData] = useState({
    wallet_id: "",
    balance: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch wallet data from backend
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await fetch("http://localhost:8000/get-wallet");
        const data = await res.json();

        if (res.ok) {
          setWalletData(data);
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
  }, []);

  if (loading) return <p>Loading wallet...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

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
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#4db6ff" }}>
        Your Wallet
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
        <p>
          <strong>Wallet ID:</strong> {walletData.wallet_id}
        </p>
        <p>
          <strong>Balance:</strong> ₹{walletData.balance}
        </p>

        <h3 style={{ marginTop: "20px" }}>Transactions</h3>
        <ul style={{ textAlign: "left", maxHeight: "150px", overflowY: "auto" }}>
          {walletData.transactions.length > 0 ? (
            walletData.transactions.map((txn, idx) => (
              <li key={idx}>
                {txn.type} ₹{txn.amount} — {new Date(txn.date).toLocaleString()}
              </li>
            ))
          ) : (
            <li>No transactions yet</li>
          )}
        </ul>
      </div>
      <button onClick={() => navigate("/transaction")}>Go to Transactions</button>
    </div>
  );
}
export default Wallet;