import React, { Component } from 'react'

import { List, Button, Badge, Card, Spin } from 'antd'

import { connect } from 'react-redux'

import { markNotificationAsReadById, markNotificationAsReadAll } from '../../actions/notifications'

const getState = state => {
  const {
    list,
    isLoading
  } = state.notifications
  return {
    list,
    isLoading
  }
}

@connect(getState,{ markNotificationAsReadById, markNotificationAsReadAll })
class Notifications extends Component {
    render() {
        return (
          <Spin spinning={this.props.isLoading}> 
            <Card 
              title="通知中心" 
              bordered={false} 
              extra={
                <Button
                  disabled={this.props.list.every(item => item.hasRead === true)}
                  onClick={this.props.markNotificationAsReadAll}
                >全标记为已读</Button>
              }
            >
              <List
                  itemLayout="horizontal"
                  dataSource={this.props.list}
                  renderItem={item => (
                  <List.Item
                      extra={
                        item.hasRead
                        ?
                        null
                        :
                        <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>
                      }
                  >
                      <List.Item.Meta
                          title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                          description={item.desc}
                      />
                  </List.Item>
                  )}
              />
            </Card>
          </Spin>
        )
    }
}

export default Notifications
