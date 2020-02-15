import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu, Layout } from 'antd';
import styled from 'styled-components';

import { Post, Search } from './screens';
import logo from './logo.svg';
import './App.css';


// TODO: This grid breaks html width on mobile view.
const SGrid = styled.div`
  height: 100%;
  width: 960px;
  max-width: 960px;
  margin: 0 auto;
`

const { Header, Footer, Content } = Layout;


function App() {
  const [activeRoute, setActiveRoute] = useState('/')

  return (
    <Layout className='App'>
      <Router>
        <Header>
          <SGrid>
            <div>
            <Link to="/">
              <img src={logo} width={40} />
            </Link>
            </div>
            <Menu style={{ display: 'inline-flex'}} onClick={e => setActiveRoute(e.key)} selectedKeys={[activeRoute]} mode="horizontal">
              <Menu.Item key="post">
                <Link to="/post">Post</Link>
              </Menu.Item>
              <Menu.Item key="search">
                <Link to="/search">Discover</Link>
              </Menu.Item>
            </Menu>
          </SGrid>
        </Header>
        <Content style={{ margin: '10em 0'}}>
          <SGrid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Switch>
              <Route path="/post" component={Post} />
              <Route path="/search" component={Search} />
              <Redirect from="/" exact to="/post" />
            </Switch>
          </SGrid>
        </Content>
        <Footer className="remove-padding txt-right">
          <SGrid>Made with _ in _ by _ & _</SGrid>
        </Footer>
      </Router>
    </Layout>
  );
}

export default App;
