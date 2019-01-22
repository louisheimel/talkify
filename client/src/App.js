import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Login, SignUp } from "./components";

import "./App.css";
import "antd/lib/layout";
import "./LoginPage.css";

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header>
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
          </Header>

          <Layout>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Layout>
          <Footer>
            <a href="https://github.com/louisheimel/talkify">Github</a>
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
