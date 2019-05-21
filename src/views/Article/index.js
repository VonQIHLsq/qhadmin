import React, { Component } from 'react'

import { Card, Button, Table } from 'antd'

import { getArticles } from '../../requests'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

export default class ArticleList extends Component {
  componentDidMount () {
    getArticles()
      .then(resp => {
        console.log(resp)
      })
  }
  render() {
    return (
      <div>
        <Card 
          title="Card title" 
          bordered={false} 
          extra={<Button>导出Excel</Button>} 
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            pagination={{
              hideOnSinglePage: true
            }}
          />
        </Card>
      </div>
    )
  }
}
