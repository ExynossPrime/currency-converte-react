import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import Navbar from './components/Navbar';
import CurrencyList from './components/CurrencyList';
import CurrencyDetail from './components/CurrencyDetail';
import CurrencyConverter from './components/CurrencyConverter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';


const App = () => {
  return (
      <CurrencyProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<CurrencyList />} />
                <Route path="/currency/:code" element={<CurrencyDetail />} />
                <Route path="/converter" element={<CurrencyConverter />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CurrencyProvider>
  );
};

export default App;
