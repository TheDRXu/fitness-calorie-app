import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Graph from './Graph';
import Graph2 from './Graph2';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Graph" element={<Graph />} />
          <Route path="/Graph2" element={<Graph2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
