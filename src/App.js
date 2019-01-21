import React, { Component } from 'react';
import {Layout} from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import 'antd/lib/layout/style/css';

const {Header, Footer, Content, Sider} = Layout;

class App extends Component {
  render() {
    return (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Content>main content</Content>
          </Layout>
          <Footer>footer</Footer>
        </Layout>
    );
  }
}

export default App;
