import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { adminRoutes } from './routes'

import Frame from './components/Frame'

import { connect } from 'react-redux'

const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <Frame>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route 
                  key={route.pathname} 
                  path={route.pathname} 
                  exact={route.exact}
                  render={(routerProps) => {
                    const hasPromission = route.roles.includes(this.props.role)
                    return hasPromission ? <route.component {...routerProps}/> : <Redirect to='/admin/noauth'/>
                }}/>
              )
            })
          }
          <Redirect from="/admin" to="/admin/dashboard"/>
          <Redirect to="/404"/>
        </Switch>
      </Frame>
      :
      <Redirect to='/login'/>
    )
  }
}
export default App
