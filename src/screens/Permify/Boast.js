import React from 'react';
import { Row, Col, Icon, Button, Typography as T } from 'antd';

import { Link } from '@components';
import { Sw4rtzAPI } from '@services';
import { PermifyReducer } from './permify.reducer';

export const Boast = ({ dispatch, summary, permaID }) => {
  const reset = () => dispatch({ type: PermifyReducer.actionTypes.RESET })
  return (
    <>
      <T.Paragraph>
        Congratulations! We're one step closer to a world of open-science.
        Be proud and boast!
      </T.Paragraph>
      {permaID && (
        <Link
          to={Sw4rtzAPI.getExplorerLink(permaID)}>
          {summary.title}
        </Link>
      )}
      <Row>
        <Col span={4} style={{ fontSize: '1.5em', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="https://twitter.com"><Icon type="twitter" /></Link>
          <Link to="https://facebook.com"><Icon type="facebook" /></Link>
          <Link to="https://instagram.com"><Icon type="instagram" /></Link>
          <Link to="https://reddit.com"><Icon type="reddit" /></Link>
        </Col>
      </Row>
      <Row style={{ padding: '1.5em 0' }} type="flex" justify="start">
        <Col span={3}>
          <Button onClick={reset}>Give me more!</Button>
        </Col>
      </Row>
    </>
  )
}
