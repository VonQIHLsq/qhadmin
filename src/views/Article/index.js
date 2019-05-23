import React, { Component } from 'react'

import { Card, Button, Table, Tag, Tooltip, Modal, Typography, message } from 'antd'

import { getArticles, deleteArticle } from '../../requests'
import XLSX from 'xlsx'
import moment from 'moment'

const ButtonGroup = Button.Group
const confirm = Modal.confirm

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
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10
    }
  }

  articleDelete = (record) => {
    const getData = this.getData
    confirm({
      title: '此文章删除后将不能复原，请谨慎',
      content: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span>吗</Typography>,
      onOk() {
        return new Promise((resolve, reject) => {
          deleteArticle(record.id)
            .then(resp => {
              message.success(resp.msg)
              getData()
            })
            .finally(() => {
              resolve()
            })
        })
      },
      onCancel() {}
    })
  }

  toEdit = (record) => {
    this.props.history.push(`/admin/article/edit/${record.id}`)
  }

  createColumns = (columnsKeys) =>{
    const columns = columnsKeys.map(item => {
      if (item === 'amount') {
        return {
          title: titleColumnsMap[item],
          key: item,
          render: (text,record) => {
            return (
              <Tooltip title={record.amount > 230 ? "超过230" : "小于230"}>
                <Tag color={record.amount > 230 ? "red" : "cyan"}>{record.amount}</Tag>
              </Tooltip>
            )
          }
        }
      }
      if (item === 'createAt') {
        return {
          title: titleColumnsMap[item],
          key: item,
          render: (text,record) => {
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
      render: (text,record) => {
        return (
          <ButtonGroup>
            <Button size="small" type="primary" onClick={this.toEdit.bind(this,record)}>编辑</Button>
            <Button size="small" type="danger" onClick={this.articleDelete.bind(this,record)}>删除</Button>
          </ButtonGroup>
        )
      }
    })
    return columns
  } 

  toExcel = () =>{
    const data = [Object.keys(this.state.dataSource[0])]
    this.state.dataSource.forEach(item => {
      data.push([
        item.id,
        item.title,
        item.author,
        item.amount,
        moment(item.createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    })
    const ws = XLSX.utils.aoa_to_sheet(data)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `articles-${moment().format('YYYY年MM月DD日 HH:mm:ss')}.xlsx`)
  } 

  getData = () => {
    this.setState({
      isLoading: true
    })
    getArticles(this.state.offset,this.state.limited)
      .then(resp => {
        const columnsKeys = Object.keys(resp.list[0])
        const columns = this.createColumns(columnsKeys)
        this.setState({
          total: resp.total,
          dataSource: resp.list,
          columns
        })
      })
      .catch(err => {

      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      offset: pageSize * (page-1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }

  onShowSizeChange = (current, size) =>{
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }

  componentDidMount () {
    this.getData()
  }

  render() {
    return (
      <div>
        <Card 
          title="文章管理" 
          bordered={false} 
          extra={<Button onClick={this.toExcel}>导出Excel</Button>} 
        >
          <Table 
            rowKey={record => record.id}
            dataSource={this.state.dataSource} 
            columns={this.state.columns} 
            loading={this.state.isLoading}
            pagination={{
              current: this.state.offset / this.state.limited +1,
              hideOnSinglePage: true,
              total: this.state.total,
              showQuickJumper: true,
              showSizeChanger: true,
              onChange: this.onPageChange,
              onShowSizeChange: this.onShowSizeChange,
              pageSizeOptions: ['10', '20', '30', '40']
            }}
          />
        </Card>
      </div>
    )
  }
}
