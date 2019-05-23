import React, { Component } from 'react'

import { Card, Form, Input, Icon, Button } from 'antd'

import './login.less'

@Form.create()
class Login extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card title="登录管理页" className="qh-card">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember')(
              <Button block type="primary" htmlType="submit" className="login-form-button" >
                登录
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Login
