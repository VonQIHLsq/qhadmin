import React, { Component, createRef } from 'react'

import E from 'wangeditor'

import moment from 'moment'

import { editArticle, saveArticle } from '../../requests'

import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Spin,
  message
} from 'antd'

const formItemLayout = {
  labelCol: {
    span: 2
  },
  wrapperCol: {
    span: 20
  },
}

@Form.create()
class Edit extends Component {
  constructor() {
    super()
    this.edit = createRef()
    this.state = {
      isLoading: false
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        })
        this.setState({
          isLoading: true
        })
        saveArticle(this.props.match.params.id,data)
          .then(resp => {
            message.success(resp.msg)
            this.props.history.push('/admin/article')
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      }
    })
  }
  initEditContent = () => {
    this.editor = new E(this.edit.current)
    this.editor.customConfig.onchange = html => {
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  componentDidMount() {
    this.initEditContent()
    this.setState({
      isLoading: true
    })
    editArticle(this.props.match.params.id)
      .then(resp => {
        const { id, ...data } = resp
        data.createAt = moment(data.createAt)
        this.props.form.setFieldsValue(data)
        this.editor.txt.html(data.content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card 
        title="文章编辑" 
        bordered={false} 
        extra={<Button onClick={this.props.history.goBack}>取消</Button>} 
      >
        <Spin spinning={this.state.isLoading}>
          <Form 
            onSubmit={this.handleSubmit} 
            className="login-form"
            {...formItemLayout}
          >
            <Form.Item
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '标题不能为空' }],
              })(
                <Input
                  placeholder="title"
                />
              )}
            </Form.Item>
            <Form.Item
              label="作者"
            >
              {getFieldDecorator('author', {
                rules: [{ required: true, message: '作者不能为空' }],
              })(
                <Input
                  placeholder="author"
                />
              )}
            </Form.Item>
            <Form.Item
              label="阅读量"
            >
              {getFieldDecorator('amount', {
                rules: [{ required: true, message: '阅读量不能为空' }],
              })(
                <Input
                  placeholder="阅读量"
                />
              )}
            </Form.Item>
            <Form.Item 
              label="创建时间"
            >
              {getFieldDecorator('createAt', {
                rules: [{ type: 'object', required: true, message: '时间不能为空' }]
              })(
                <DatePicker 
                  showTime 
                  format="YYYY-MM-DD HH:mm:ss" 
                  placeholder="选择时间"
                />
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              style={{position:'relative',zIndex:'0'}}
            >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '内容不能为空' }],
              })(
                <div ref={this.edit}></div>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{offset: 2}}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}
export default Edit
