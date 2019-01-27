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
    const { handleLogOut, loggedIn } = this.props;
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
            {loggedIn && (
              <Link
                style={{
                  textDecoration: "none",
                  userSelect: "none",
                  color: "#fff"
                }}
                to="/"
                onClick={handleLogOut}
              >
                Log Out
              </Link>
            )}
          </Header>

          <Layout>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/home" component={loggedIn ? Home : Login} />
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
  state => ({ loggedIn: state.loginStatus.loggedIn }),
  dispatch => ({
    handleLogOut: e => dispatch(logOut())
  })
)(App);
