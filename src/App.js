import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { adminRoutes } from './routes'

import Frame from './components/Frame'

export default class App extends Component {
  render() {
    return (
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
                    return <route.component {...routerProps}/>
                }}/>
              )
            })
          }
          <Redirect from="/admin" to="/admin/dashboard"/>
          <Redirect to="/404"/>
        </Switch>
      </Frame>
    )
  }
}
