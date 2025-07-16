// src/pages/MoneyTransfer.jsx
import React, { useState } from "react";

function MoneyTransfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleTransfer = () => {
    const amt = parseFloat(amount);

    if (!recipient || isNaN(amt)) {
      alert("Please enter valid details");
      return;
    }

    if (amt > 10000) {
      alert("⚠️ Amount exceeds ₹10,000 limit.");
      return;
    }

    const newTxn = {
      to: recipient,
      amount: amt,
      time: new Date().toLocaleTimeString(),
    };

    setTransactions([newTxn, ...transactions]);
    setRecipient("");
    setAmount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">💸 Money Transfer</h1>

      {/* Transfer Form */}
      <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl mb-8">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Send Money</h2>
        <input
          type="text"
          placeholder="Recipient Name"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg text-white outline-none"
        />
        <input
          type="number"
          placeholder="Amount (Max ₹10,000)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-white/10 border border-gray-500 rounded-lg text-white outline-none"
        />
        <button
          onClick={handleTransfer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Transfer
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Transaction History
        </h2>
        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((txn, index) => (
              <li key={index} className="text-white/90">
                Sent ₹<span className="font-bold">{txn.amount}</span> to{" "}
                <span className="italic">{txn.to}</span> at {txn.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MoneyTransfer;
