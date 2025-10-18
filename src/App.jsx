import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/signup'
import Wallet from './components/wallet'
import Transaction from './components/transaction'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
