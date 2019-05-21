import React, { Component } from 'react'

import { Card, Button, Table, Tag } from 'antd'

import { getArticles } from '../../requests'
import moment from 'moment'

const ButtonGroup = Button.Group

const titleColumnsMap = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}

export default class ArticleList extends Component {
  constructor () {
    super()
    this.state = {
      dataSource: [],
      columns: [],
      total: 0
    }
  }
  createColumns = (columnsKeys) =>{
    const columns = columnsKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleColumnsMap[item],
          key: item,
          render: (record) => {
            return <Tag color={record.amount > 230 ? "red" : "cyan"}>{record.amount}</Tag>
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleColumnsMap[item],
          key: item,
          render: (record) => {
            return moment(record.createAt).format('YYYY年MM月DD日 HH:mm:ss')
          }
        }
      }
      return {
        title: titleColumnsMap[item],
        dataIndex: item,
        key: item
      }
    })
    columns.push({
      title: '操作',
      key: 'action',
      render: () => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary">编辑</Button>
            <Button size="small" type="danger">删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  }
  getData = () => {
    getArticles()
      .then(resp => {
        const columnsKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns
        })
      })
  }
  componentDidMount () {
    this.getData()
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
            rowKey={record => record.id}
            dataSource={this.state.dataSource} 
            columns={this.state.columns} 
            pagination={{
              hideOnSinglePage: true
            }}
          />
        </Card>
      </div>
    )
  }
}
