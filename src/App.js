import React from 'react';

import { Layout } from 'antd';
import styled from 'styled-components';

import logo from './logo.svg';
import './App.css';


// TODO: This grid breaks html width on mobile view.
const SGrid = styled.div`
  width: 960px;
  max-width: 960px;
  margin: 0 auto;
`


function App() {
  const { Header, Footer, Content } = Layout;

  return (
    <Layout className='App'>
      <Header>
        <SGrid>Header</SGrid>
      </Header>
      <Content>
        <SGrid>Container</SGrid>
      </Content>
      <Footer className="remove-padding">
        <SGrid>Footer</SGrid>
      </Footer>
    </Layout>
  );
}

export default App;
