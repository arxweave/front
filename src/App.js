import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Menu, Layout } from 'antd';
import styled, { css } from 'styled-components';

import { Icon } from './components'
import { Post, Search } from './screens';
import logo from './logo.svg';
import './App.css';

// TODO: This grid breaks html width on mobile view.
const SGrid = styled.div`
  height: 100%;
  display: flex;
  justify-content: stretch;
  max-width: 768px;
  margin: 0 auto;

  // Keep main grid aligned with header.
  ${props => props.main && css`
    padding: 0 20px 0 10px;
    // antd lg
    @media screen and (max-width: 992px) {
      padding: 0 30px 0 20px;
    }
    // antd sm
    @media screen and (max-width: 576px) {
      padding: 0 70px 0 60px;
    }
  `}

  ${props => props.footer && css `
    justify-content: flex-end;
    padding-right: 20px;
  `}
`

const { Header, Footer, Content } = Layout;


function App() {
  const [activeRoute, setActiveRoute] = useState('/')

  return (
    <Router>
      <Layout className='App'>
        <Header style={{
          position: 'fixed',
          width: '100%',
          zIndex: '999'
          }}>
          <SGrid style={{
            display: 'flex',
            justifyContent: 'space-between'
            }}>
            <div style={{ display: 'inline-block', color: 'white'}}>
              <Link to="/">
                <img src={logo} width={40} />
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              onClick={e => setActiveRoute(e.key)}
              selectedKeys={[activeRoute]}
              style={{
                display: 'inline-block',
                lineHeight: '64px',
              }}>
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
          <SGrid main style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }}>
            <Switch>
              <Route path="/post" component={Post} />
              <Route path="/search" component={Search} />
              <Redirect from="/" exact to="/post" />
            </Switch>
          </SGrid>
        </Content>
        <Footer>
          <SGrid footer>
            <span>
              Made with <Icon type="fist" /> in <Icon type="eiffel" style={{ marginLeft: '-2px', verticalAlign: '-1px' }} />
            </span>
          </SGrid>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
