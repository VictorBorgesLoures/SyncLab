import React from 'react';
import fetchApi from './fetch/fetch-api';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function App(props) {
  const navigate = useNavigate();
  const locate = useLocation();
  console.log(locate);
  fetchApi('/auth', "post").then(res => {
    console.log(res);
    res.json().then(r => {
      if (r.redirect && locate.pathname != r.redirect) navigate(r.redirect);
      else
        return <Outlet></Outlet>
    });
    return <Outlet ></Outlet>
  }).catch(e => navigate('/'));
}

export default App;