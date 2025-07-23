import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { auth, getTransactions, addTransaction, deleteTransaction, editTransaction } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Transactions from "./routes/Transactions";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || []
  );
  
  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Using localStorage to persist transactions

  // useEffect(() => {
  // localStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [transactions]);

  // const addTransaction = (transaction) => {
  //   setTransactions([{ ...transaction, id: Date.now() }, ...transactions]);
  // };

  // const deleteTransaction = (id) => {
  //   setTransactions(transactions.filter((t) => t.id !== id));
  // };

  // const editTransaction = (id, updatedTransaction) => {
  //   setTransactions(
  //     transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
  //   );
  // };\

  // Using transaction functions from firebase.js

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        try {
          const data = await getTransactions(user.uid);
          setTransactions(data);
        } catch (err) {
          console.error("Error fetching transactions:", err);
        }
      }
    };
    
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleAddTransaction = async (tx) => {
    if (!user) return;
    try {
      const newTx = await addTransaction(user.uid, tx);
      setTransactions((prev) => [newTx, ...prev]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const handleDeleteTransaction = async (_id) => {
    if (!user) return;
    try {
      await deleteTransaction(user.uid, _id);
      setTransactions((prev) => prev.filter((t) => t._id !== _id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const handleEditTransaction = async (_id, tx) => {
    if (!user) return;
    try {
      await editTransaction(user.uid, _id, tx);
      setTransactions((prev) =>
        prev.map((t) => (t._id !== _id ? t : { ...t, ...tx }))
      );
    } catch (err) {
      console.error("Error updating transaction:", err);
    }
  };

  return (
    <div>
      <Navbar user={user} />
      <h1 className="main-heading">Personal Finance Tracker</h1>

      <div>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route path="/" element={<Home transactions={transactions} />} />
            <Route
              path="/transactions"
              element={
                <Transactions
                  transactions={transactions}
                  addTransaction={handleAddTransaction}
                  deleteTransaction={handleDeleteTransaction}
                  editTransaction={handleEditTransaction}
                />
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard transactions={transactions} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
