import React from 'react';
import { parseString } from 'xml2js';
import { Button, Form, Typography, Steps, Input } from 'antd';
import { ARXIV_BASE_URL } from '../constants';

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
  form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue }
}) => {

  const handleSubmit = (e) => {
    // Stop default page reload
    e.preventDefault();
    // Trigger api request
    console.log('hello', getFieldValue('doi'))
    fetch(getDOIQueryUrl(getFieldValue('doi')))
      .then(response => response.text())
      .then(res => {
        const json = parseString(res, (err, res) => {

          console.log('Res', err, res)
        })
        // console.log(json)
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

const Step2 = () => {
  const dummy = {
    author: 'Alan Kay',
    description: 'Composition over class inheritance'
  }
  const perminify = () => {
    console.log('Perminify')
  }

  return (
    <>
      <Paragraph>Send into the Permawed</Paragraph>
      <Paragraph code>{JSON.stringify(dummy, null, 2)}</Paragraph>
      <Button type="primary" onClick={perminify}>
        Perminify
      </Button>
    </>
  )
}

export default function Post() {
  return (
    <Steps direction={'vertical'} current={1}>
      <Step title={<Title level={4}>Find a Paper</Title>} description={<Step1 />} />
      <Step title={<Title level={4}>Perminify</Title>} description={<Step2 />} />
      <Step title={<Title level={4}>Share the love</Title>} description="This is a description." />
    </Steps>
  )
}
