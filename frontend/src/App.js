import React from 'react';
import fetchApi from './fetch/fetch-api';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function App({ children }) {
  const navigate = useNavigate();
  const locate = useLocation();
  console.log(locate);
  fetchApi('/auth', "post").then(res => {
    console.log(res);
    res.json().then(r => {
      if (r.redirect && locate.pathname != r.redirect) navigate(r.redirect);
    });
  }).catch(e => navigate('/'));
  return <Outlet></Outlet>
}

export default App;