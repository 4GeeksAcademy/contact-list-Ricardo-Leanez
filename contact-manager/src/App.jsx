import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Contacts from './views/Contacts';
import AddContact from './views/AddContact';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/add-contact/:id" element={<AddContact />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;