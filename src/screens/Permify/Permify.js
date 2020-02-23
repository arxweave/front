import React from 'react';
import { Row, Col, Button, Typography as T } from 'antd';
import ReactJson from 'react-json-view'
import * as R from 'ramda'

import { Sw4rtzAPI } from '@services';
import { PermifyReducer } from './permify.reducer'

export const Permify = ({ dispatch, summary }) => {
  const permify = () => {
    dispatch({ type: PermifyReducer.actionTypes.PERMINAFY_REQUEST })

    Sw4rtzAPI
      .permify(summary.id)
      .then(res => {
        dispatch({
          type: PermifyReducer.actionTypes.PERMINAFY_SUCCESS,
          payload: {
            permaID: res.txId
          }
        })
      })
      .catch(console.warn)
  }

  const cancel = () => {
    dispatch({ type: PermifyReducer.actionTypes.GO_BACK })
  }

  const formatData = (d) => {
    return {
      ...d,
      authors: d.authors.flatMap(a => a.name)
    }
  }

  return (
    <>
      <T.Paragraph>Send into the Permaweb</T.Paragraph>
      {!R.isEmpty(summary) &&
        <ReactJson
          theme={'solorized'}
          name={false}
          src={formatData(summary)}
          displayDataTypes={false}
          displayObjectSize={false}
          indentWidth={2}
          collapsed={1}
          enableClipboard={false}
          enableEdit={false}
        />
      }
      <Row style={{ margin: '1.5em 0' }} type="flex" justify="start">
        <Col xs={5} md={3}>
          <Button type="default" onClick={cancel}>
            Cancel
          </Button>
        </Col>
        <Col xs={5} md={3}>
          <Button type="primary" onClick={permify}>
            Permify
          </Button>
        </Col>
      </Row>
    </>
  )
}
