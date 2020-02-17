import React, { useReducer } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'
import { Row, Col, Icon, Button, Form, Typography, Steps, Input } from 'antd';

import { ARXIV_BASE_URL, SW4RTZ_API } from '../constants';
import { parseXML, arXivIDFromURL } from '../utils';
import { PostReducer, initialState } from './post.reducer';

const { Title, Paragraph } = Typography;
const { Step } = Steps;


const hasErrors = (fieldsErrors) => {
  return Object.keys(fieldsErrors).some(f => fieldsErrors[f])
}

const validateDOI = (rule, value, callback) => {
  console.log('Validating DOI', value)
  callback()
}

const getDOIQueryUrl = (doi) => `${ARXIV_BASE_URL}/query?id_list=${2002.00012}`


const Step1 = Form.create({ name: 'get_doi' })(({
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
          id: entry.id[0],
          title: entry.title[0],
          summary: entry.summary[0],
          authors: entry.author,
          links: entry.link,
          categories: entry.category
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

const Step2 = ({ dispatch, data }) => {
  const perminify = () => {
    dispatch({ type: PostReducer.actionTypes.PERMINAFY_REQUEST })
    fetch(
      `${SW4RTZ_API}/new`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arXivID: arXivIDFromURL(data.id) })
      })
      .then((res) => {

        console.log(res.json())
        dispatch({ type: PostReducer.actionTypes.PERMINAFY_SUCCESS })
      })
      .catch(console.log)
  }

  const cancel = () => {
    dispatch({ type: PostReducer.actionTypes.GO_BACK })
  }

  return (
    <>
      <Paragraph>Send into the Permaweb</Paragraph>
      {data &&
        <ReactJson
          theme={'solorized'}
          name={false}
          src={data}
          displayDataTypes={false}
          displayObjectSize={false}
          indentWidth={2}
          collapsed={1}
          enableClipboard={false}
          enableEdit={false}
        />
      }
      <Row type="flex" justify="start">
        <Col span={3}>

          <Button type="default" onClick={cancel}>
            Cancel
          </Button>
        </Col>
        <Col span={3}>

          <Button type="primary" onClick={perminify}>
            Perminify
          </Button>
        </Col>


      </Row>
    </>
  )
}

const Step3 = ({ dispatch }) => {
  const reset = () => dispatch({ type: PostReducer.actionTypes.RESET })
  return (
    <>
      <Button onClick={reset}>Give me more!</Button>
    </>
  )
}

export default function Post() {
  const [state, dispatch] = useReducer(PostReducer, initialState)
  const { currentStep, isLoading, data } = state

  const waitStatus = (step) => {
    return currentStep === step && isLoading
  }

  return (
    <Steps direction="vertical" current={currentStep}>
      <Step
        title={<Title level={4} className="marginless">Find a Paper</Title>}
        description={currentStep === 0 && <Step1 dispatch={dispatch} />}
        icon={waitStatus(0) && <Icon type="loading"/>}
      />
      <Step
        title={<Title level={4} className="marginless">Perminify</Title>}
        description={currentStep === 1 && <Step2 dispatch={dispatch} data={data} />}
        icon={waitStatus(1) && <Icon type="loading" />}
      />
      <Step
        title={<Title level={4} className="marginless">Share the love</Title>}
        description={currentStep === 2 && <Step3 dispatch={dispatch} />}
      />
    </Steps>
  )
}
