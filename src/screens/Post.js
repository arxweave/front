import React, { useReducer } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'
import * as R from 'ramda'
import { Row, Col, Icon, Button, Form, Typography as T, Steps, Input } from 'antd';

import { Link } from '../components';
import { ARXIV_BASE_URL } from '../constants';
import { parseXML, arXivIDFromURL } from '../utils';
import { PostReducer, initialState } from './post.reducer';
import { Sw4rtzAPI } from '../services';

const { Step } = Steps;

const hasErrors = (fieldsErrors) => {
  return Object.keys(fieldsErrors).some(f => fieldsErrors[f])
}

const validateDOI = (rule, value, callback) => {
  console.log('Validating DOI', value)
  callback()
}

const getDOIQueryUrl = (doi) => `${ARXIV_BASE_URL}/query?id_list=${doi}`


const FindByDOI = Form.create({ name: 'get_doi' })(({
  form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue, ...form },
  dispatch
}) => {

  const handleSubmit = (value, e) => {
    // Stop default page reload
    e.preventDefault();
    // Trigger api request
    dispatch({ type: PostReducer.actionTypes.SEARCH_REQUEST })
    axios
      .get(getDOIQueryUrl(getFieldValue('doi')))
      .then(res => {
        if (res.status !== 200) { throw new Error('useful?')}
        return parseXML(res.data)
      })
      .then(data => {
        const [entry] = data.feed.entry
        return {
          id: arXivIDFromURL(entry.id[0]),
          url: entry.id[0],
          title: entry.title[0],
          summary: entry.summary[0],
          authors: entry.author,
          links: entry.link,
          categories: entry.category,
        }
      })
      .then(summary => {
        dispatch({ type: PostReducer.actionTypes.SEARCH_SUCCESS, payload: summary })
      })
      .catch(foo => console.log('Erorr', foo))
  }

  const DOIError = isFieldTouched('doi') && getFieldError('doi');

  return (
    <>
      <Form layout="inline">
        <Form.Item
          wrapperCol={{ sm: 24 }}
          style={{ width: "100%", marginRight: '1em'}}
          validateStatus={DOIError ? 'error' : ''}>
          {getFieldDecorator('doi', {
            rules: [
              { required: true, message: 'Please enter a DOI' },
              { validator: validateDOI }
            ],
          })(
            <Input.Search
              enterButton
              size="large"
              placeholder="DOI number"
              onSearch={handleSubmit}
              />
          )}
        </Form.Item>
      </Form>
    </>
  )
})

const Permify = ({ dispatch, summary }) => {
  const permify = () => {
    dispatch({ type: PostReducer.actionTypes.PERMINAFY_REQUEST })

    Sw4rtzAPI
      .permify(summary.id)
      .then(res => {
        dispatch({
          type: PostReducer.actionTypes.PERMINAFY_SUCCESS,
          payload: {
            permaID: res.txId
          }
        })
      })
      .catch(console.warn)
  }

  const cancel = () => {
    dispatch({ type: PostReducer.actionTypes.GO_BACK })
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
        <Col span={3}>
          <Button type="default" onClick={cancel}>
            Cancel
          </Button>
        </Col>
        <Col span={3}>
          <Button type="primary" onClick={permify}>
            Permify
          </Button>
        </Col>
      </Row>
    </>
  )
}

const Boast = ({ dispatch, summary, permaID }) => {
  const reset = () => dispatch({ type: PostReducer.actionTypes.RESET })
  return (
    <>
      <T.Paragraph>
        Congratulations! We're one step closer to a world of open-science.
        Be proud and boast!
      </T.Paragraph>
      { permaID && (
          <Link
            to={Sw4rtzAPI.getExplorerLink(permaID)}>
          {summary.title}
          </Link>
      )}
      <Row>
        <Col span={4} style={{ fontSize: '1.5em', display: 'flex', justifyContent: 'space-between'}}>
          <Link to="https://twitter.com"><Icon type="twitter"/></Link>
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

export default function Post() {
  const [state, dispatch] = useReducer(PostReducer, initialState)
  const { currentStep, isLoading, summary, permaID } = state

  const waitStatus = (step) => {
    return currentStep === step && isLoading
  }

  return (
    <Steps direction="vertical" current={currentStep}>
      <Step
        title={<T.Title level={4} className="marginless">Find a Paper</T.Title>}
        description={currentStep === 0 && <FindByDOI dispatch={dispatch} />}
        icon={waitStatus(0) && <Icon type="loading"/>}
      />
      <Step
        title={<T.Title level={4} className="marginless">Permify</T.Title>}
        description={currentStep === 1 && <Permify dispatch={dispatch} summary={summary} />}
        icon={waitStatus(1) && <Icon type="loading" />}
      />
      <Step
        title={<T.Title level={4} className="marginless">Boast</T.Title>}
        description={currentStep === 2 && <Boast dispatch={dispatch} summary={summary} permaID={permaID} />}
      />
    </Steps>
  )
}
