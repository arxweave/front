import React, { useReducer } from 'react';
import axios from 'axios';
import ReactJson from 'react-json-view'
import { Button, Form, Typography, Steps, Input } from 'antd';

import { ARXIV_BASE_URL } from '../constants';
import { parseXML } from '../utils';
import { PostReducer } from './post.reducer';

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
  form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue },
  dispatch
}) => {

  const handleSubmit = (e) => {
    // Stop default page reload
    e.preventDefault();
    // Trigger api request
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
        console.log('summary', summary)
        dispatch({ type: PostReducer.actionTypes.FETCH_SUCCESS, payload: summary })
      })
      .catch(foo => console.log('Erorr', foo))
  }

  const DOIError = isFieldTouched('doi') && getFieldError('doi');

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="DOI" validateStatus={DOIError ? 'error' : ''}>
          {getFieldDecorator('doi', {
            rules: [
              { required: true, message: 'Please enter a DOI' },
              { validator: validateDOI }
            ],
          })(
            <Input size="large" placeholder="DOI number" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Fetch
          </Button>
        </Form.Item>
      </Form>
    </>
  )
})

const Step2 = ({ dispatch, summary }) => {
  const perminify = () => {
    console.log('Perminify')
  }

  return (
    <>
      <Paragraph>Send into the Permawed</Paragraph>
      {summary &&
        <ReactJson
          theme={'solorized'}
          name={false}
          src={summary}
          displayDataTypes={false}
          displayObjectSize={false}
          indentWidth={2}
          collapsed={1}
          enableClipboard={false}
          enableEdit={false}
        />
      }
      <Button type="primary" onClick={perminify}>
        Perminify
      </Button>
    </>
  )
}

export default function Post() {
  const [state, dispatch] = useReducer(PostReducer, {})
  return (
    <Steps direction={'vertical'} current={1}>
      <Step title={<Title level={4}>Find a Paper</Title>} description={<Step1 dispatch={dispatch} />} />
      <Step title={<Title level={4}>Perminify</Title>} description={<Step2 dispatch={dispatch} summary={state.summary} />} />
      <Step title={<Title level={4}>Share the love</Title>} description="This is a description." />
    </Steps>
  )
}
