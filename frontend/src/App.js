import React, { Component } from 'react';
import fetchApi from './fetch/fetch-api';
import withRouter from './components/withRouter';
import { Outlet, componentDidMount } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.userAuth();
  }

  userAuth() {
    fetchApi('/auth', "post")
      .then(res => {
        console.log(res);
        res.json().then(r => {
          console.log(r);
          if (r.status == 200) {
            if (this.props.locate.pathname == '/matricula') console.log("NAO MUDE");
            else if (!(/^\/synclab/.exec(this.props.locate.pathname))) this.props.navigate('/synclab');
          } else {
            console.log(r.redirect);
            console.log(this.props.locate.pathname != r.redirect);
            console.log(r.redirect == '/login');
            if (r.redirect && this.props.locate.pathname != r.redirect && (r.redirect == '/login' || r.redirect == '/matricula')) {
              console.log("aqui");
              this.props.navigate(r.redirect);
            }
          }
        });
      }).catch(e => this.props.navigate('/'));

  }

  render() {
    return <Outlet></Outlet>
  }
}

export default withRouter(App);