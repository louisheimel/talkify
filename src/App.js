import React, { Component } from 'react';
import {Layout, Input, Button} from 'antd';
import './App.css';
import 'antd/lib/layout';
import './LoginPage.css';

const {Header, Footer,
  //  Content
  } = Layout;


class App extends Component {
  render() {
    return (
        <Layout>
          <Header>Talkify</Header>
          <Layout>
            <Input size="large" placeholder="Username"/>
            <Input size="large" placeholder="Password"/>

          <Button size="large">Submit</Button>
          </Layout>
          <Footer><a href="https://github.com/louisheimel/talkify">Github</a></Footer>
          </Layout>
    );
  }
}

export default App;
