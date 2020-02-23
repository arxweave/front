import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import { Typography as T, Menu, Layout } from 'antd';
import styled, { css } from 'styled-components';

import { Icon, Link } from '@components'
import { PermifyFlow, Discover } from '@screens';
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
    margin-top: 18em;
    padding: 0 20px 0 0;
    // antd lg
    @media screen and (max-width: 992px) {
      padding: 0 30px 0 15px;
    }
    // antd sm
    @media screen and (max-width: 576px) {
      margin-top: 10em;
      padding: 0 70px 0 50px;
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
          zIndex: '999',
          backgroundColor: '#f0f2f5'
          }}>
          <SGrid style={{
            display: 'flex',
            justifyContent: 'space-between'
            }}>
            <div style={{ display: 'inline-flex', alignItems: 'center'}}>
              <Link to="/">
                <T.Title
                  id="logo"
                  level={2}
                  style={{
                    display: 'inline-block',
                    marginBottom: '0',
                    lineHeight: '30px',
                    verticalAlign: 'sub'
                    }}>
                  Sw4rtz.it
                </T.Title>
              </Link>
            </div>
            <Menu
              mode="horizontal"
              onClick={e => setActiveRoute(e.key)}
              selectedKeys={[activeRoute]}
              style={{
                display: 'inline-block',
                lineHeight: '64px',
                backgroundColor: '#f0f2f5'
              }}>
              <Menu.Item key="permify">
                <Link to="/permify">Permify</Link>
              </Menu.Item>
              <Menu.Item key="discover">
                <Link to="/discover">Discover</Link>
              </Menu.Item>
            </Menu>
          </SGrid>
        </Header>
        <Content>
          <SGrid main style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }}>
            <Switch>
              <Route path="/permify" component={PermifyFlow} />
              <Route path="/discover" component={Discover} />
              <Redirect from="/" exact to="/permify" />
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
