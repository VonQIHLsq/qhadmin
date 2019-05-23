import React, { Component } from 'react'

import { List, Button, Badge } from 'antd'

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]

export default class Notifications extends Component {
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item
                    extra={<Button>标记为未完成</Button>}
                >
                    <List.Item.Meta
                        title={<Badge dot>{item.title}</Badge>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
                )}
            />
        )
    }
}
