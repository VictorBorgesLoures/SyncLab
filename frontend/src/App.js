import React from 'react';
import fetchApi from './fetch/fetch-api';
import { useNavigate } from 'react-router-dom';

function App({ children }) {

  const navigate = useNavigate();

  fetchApi('/api/auth',"post").then(res => {
    console.log(res);
    // res.json().then(r => navigate(r.redirect, { replace: true }));
  }).catch(e => console.log(e));

  return (
    <div>
      {children}
    </div>
  );
}

export default App;