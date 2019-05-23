import React, { Component, createRef } from 'react'

import { Card, Row, Col } from 'antd'
import './dashboard.less'

import echarts from 'echarts'

import { amountArticle } from '../../requests'

export default class Dashboard extends Component {
  constructor() {
    super()
    this.myChart = createRef()
  }

  initChart = () => {
    this.chart = echarts.init(this.myChart.current)
    amountArticle()
      .then((resp) => {
        const option = {
          xAxis: {
              type: 'category',
              data: resp.amount.map(item => item.month)
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: resp.amount.map(item => item.value),
              type: 'line'
          }]
        }
        this.chart.setOption(option)
      })
  }

  componentDidMount() {
    this.initChart()
  }

  render() {
    return (
      <>
        <Card 
          title="数据概览" 
          bordered={false} 
        >
          <Row gutter={16}>
            <Col
              className="gutter-row"
              span={6}
            >
              <div 
                className="gutter-box qh-box" 
                style={{height: '100px',backgroundColor: 'red'}}
              >col-6</div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
            >
              <div 
                className="gutter-box qh-box" 
                style={{height: '100px',backgroundColor: 'yellow'}}
              >col-6</div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
            >
              <div 
                className="gutter-box qh-box" 
                style={{height: '100px',backgroundColor: 'green'}}
              >col-6</div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
            >
              <div 
                className="gutter-box qh-box" 
                style={{height: '100px',backgroundColor: 'blue'}}
              >col-6</div>
            </Col>
          </Row>
        </Card>
        <Card 
          title="图表概览" 
          bordered={false} 
        >
          <div style={{height:'400px'}} ref={this.myChart}></div>
        </Card>
      </>
    )
  }
}
