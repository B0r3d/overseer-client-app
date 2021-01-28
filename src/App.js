import React from 'react'
import { Routes } from './Routes';
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from './components';

function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
