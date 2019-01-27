import React, { Component } from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import { Login, SignUp, Home } from "./components";

import { logOut } from "./redux/actionCreators";

import "./App.css";
import "antd/lib/layout";
import "./LoginPage.css";

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    const { logOut, loggedIn } = this.props;
    return (
      <Router>
        <Layout>
          <Header style={{ display: "flex", justifyContent: "space-between" }}>
            <Link
              style={{
                textDecoration: "none",
                userSelect: "none",
                color: "#fff"
              }}
              className="site-header"
              to="/"
            >
              Talkify
            </Link>
            <Link
              style={{
                textDecoration: "none",
                userSelect: "none",
                color: "#fff"
              }}
              to="/"
              onClick={logOut}
            >
              Log Out
            </Link>
          </Header>

          <Layout>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            {loggedIn && <Route path="/home" component={Home} />}
            <Route
              exact
              path="/home"
              render={() =>
                loggedIn ? <Redirect to="/home" /> : <Redirect to="/" />
              }
            />
          </Layout>
          <Footer>
            <a href="https://github.com/louisheimel/talkify">Github</a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default connect(
  state => (console.log(state), { loggedIn: state.loginStatus.loggedIn }),
  dispatch => ({
    handleLogOut: e => dispatch(logOut())
  })
)(App);
