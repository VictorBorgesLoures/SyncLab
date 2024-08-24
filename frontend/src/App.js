import React from 'react';
import fetchApi from './fetch/fetch-api';

function App({ children }) {

  fetchApi('/api/auth',"post").then(res => {
    console.log(res);
    res.json().then(r => console.log(r));
  }).catch(e => console.log(e));

  return (
    <div>
      {children}
    </div>
  );
}

export default App;