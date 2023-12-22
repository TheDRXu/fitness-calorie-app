import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Graph from './Graph';
import Graph2 from './Graph2';
import Graph3 from './Graph3';
import Graph4 from './Graph4';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Graph" element={<Graph />} />
          <Route path="/Graph2" element={<Graph2 />} />
          <Route path="/Graph3" element={<Graph3 />} />
          <Route path="/Graph4" element={<Graph4 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
