import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Login, SignUp, Home } from "./components";

import { logOut } from "./redux/actionCreators";

import "./App.css";
import "antd/lib/layout";
import "./LoginPage.css";

const { Header, Footer } = Layout;

class App extends Component {
  render() {
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
            <Route path="/home" component={Home} />
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
  () => ({}),
  dispatch => ({ handleLogOut: e => dispatch(logOut()) })
)(App);
