import React from 'react'

import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import App from './App'

import { mainRoutes } from './routes'

import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

render(
    <LocaleProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routerProps)=>{
                    return <App {...routerProps}/>
                }}/>
                {
                    mainRoutes.map(route => {
                        return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                    })
                }
                <Redirect from="/" to="/admin" exact/>
                <Redirect to="/404"/>
            </Switch>
        </Router>
    </LocaleProvider>,
    document.querySelector('#root')
)