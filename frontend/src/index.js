import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './pages/Registro/Registro';
import Login from './pages/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro' element={<Registro />} />
      </Routes>
    </App>
  </Router>
);

reportWebVitals();
