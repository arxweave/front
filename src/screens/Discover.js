import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

import { Sw4rtzAPI } from '../services';
import { Link } from '../components';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'DOI',
    dataIndex: 'arXivID',
    key: 'arXivID',
    render: (doi, article) => <><Link to={article.pdfLink}>{doi}</Link></>
  },
  {
    title: 'PermaID',
    dataIndex: 'broadcastedTxID',
    key: 'broadcastedTxID',
    render: (permaID) => <><Link to={Sw4rtzAPI.getExplorerLink(permaID)}>{permaID}</Link></>
  },
  {
    title: 'Status',
    dataIndex: 'statusArweave',
    key: 'status'
  },
  {
    title: 'Published',
    dataIndex: 'published',
    key: 'published',
    render: (timestamp) => <>{dayjs(timestamp).format('YYYY-MM')}</>
  },
];

export default function Discover() {
  const [articles, setArticles] = useState()

  useEffect(() => {
    Sw4rtzAPI.all()
      .then(setArticles)
      .catch(console.error)
  }, [])

  return (
    <>
      <h1>Permified Articles</h1>
      <Table
        dataSource={articles}
        rowKey={'broadcastedTxID'}
        columns={columns}
      />
    </>
  )
}
