import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge } from 'antd'
import { adminRoutes } from '../../routes'

import { withRouter } from 'react-router-dom'
import './frame.less'
import logo from './logo.png'
import { connect } from 'react-redux'

import { getNotifications } from '../../actions/notifications'
import { loginOut } from '../../actions/user'

const { Header, Content, Sider } = Layout

const menus = adminRoutes.filter(item => item.isNav === true)

const mapState = state => {
  return {
    notificationsReads: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}


@withRouter
@connect(mapState, { getNotifications, loginOut })
class Frame extends Component {

  componentDidMount() {
    this.props.getNotifications()
  }

  onMenuClick = ({key}) =>{
    if ( key === '/loginOut') {
      this.props.loginOut()
    } else {
      this.props.history.push(key)
    }
  }

  renderMenu = () => (
    <Menu onClick={this.onMenuClick}>
      <Menu.Item
        key="/admin/notifications"
      >
        <Badge dot={Boolean(this.props.notificationsReads)}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item
        key="/admin/settings"
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key="/loginOut"
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  render() {
    const selectedArr = this.props.location.pathname.split('/')
    selectedArr.length = 3
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header qh-header">
          <div className="logo qh-logo">
            <img src={logo} alt="QHADMIN"/>
          </div>
          <Dropdown overlay={this.renderMenu()}>
            <div className="qh-avatar">
              <Avatar src={this.props.avatar} />
              <Badge count={this.props.notificationsReads} offset={[5,-8]}><span className="qh-span">欢迎您！{this.props.displayName}</span></Badge>
              <Icon type="down" />
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              onClick={this.onMenuClick}
              selectedKeys={[selectedArr.join('/')]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                menus.map(item => {
                  return (
                    <Menu.Item 
                      key={item.pathname}
                    >
                      <Icon type={item.icon} />
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 16px 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 16,
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
export default Frame
