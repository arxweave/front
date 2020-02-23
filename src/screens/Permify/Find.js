import React from 'react';
import axios from 'axios';
import { Row, Col, Form, Typography as T, Input } from 'antd';

import { ARXIV_BASE_URL } from '@constants';
import { parseXML, arXivIDFromURL } from '@utils';
import { PermifyReducer } from './permify.reducer'


const hasErrors = (fieldsErrors) => {
  return Object.keys(fieldsErrors).some(f => fieldsErrors[f])
}

const validateDOI = (rule, value, callback) => {
  console.log('Validating DOI', value)
  callback()
}

const getDOIQueryUrl = (doi) => `${ARXIV_BASE_URL}/query?id_list=${doi}`

export const FindByDOI = Form.create({ name: 'get_doi' })(({
  form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, getFieldValue, ...form },
  dispatch
}) => {

  const handleSubmit = (value, e) => {
    // Stop default page reload
    e.preventDefault();
    // Trigger api request
    dispatch({ type: PermifyReducer.actionTypes.SEARCH_REQUEST })
    axios
      .get(getDOIQueryUrl(getFieldValue('doi')))
      .then(res => {
        if (res.status !== 200) { throw new Error('useful?') }
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
        dispatch({ type: PermifyReducer.actionTypes.SEARCH_SUCCESS, payload: summary })
      })
      .catch(foo => console.log('Erorr', foo))
  }
  const DOIError = isFieldTouched('doi') && getFieldError('doi');

  return (
    <>
      <Row>
        <Col>
          <T.Paragraph>
            Select the article you wish to save by entering it's DOI here.
            You can find articles by using the arxiv.org website.
          </T.Paragraph>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form layout="inline">
            <Form.Item
              wrapperCol={{ sm: 24 }}
              style={{ width: "100%", marginRight: '1em' }}
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
        </Col>
      </Row>
    </>
  )
})
