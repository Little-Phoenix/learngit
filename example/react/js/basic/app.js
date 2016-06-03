import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, IndexRoute, Redirect, Lifecycle} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const Basic = React.createClass({
  render() {
    return(
      <div>
        <h1></h1>
        <ul>
          <li> <Link to="/about">About</Link> </li>
          <li> <Link to="/inbox">Inbox</Link> </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  mixins: [ Lifecycle ],
  routerWillLeave(nextLocation){
    return "did you sure to leave?"
  },
  render() {
    return <h3>About</h3>
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return <h3>Message {this.props.params.id} </h3>
  }
})

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const routeConfig = [
  {
    path: '/',
    component: Basic,
    indexRoute: {component: Dashboard},
    childRoutes: [
      {path: 'about', component: About},
      {path: 'inbox', component: Inbox,
        childRoutes: [
          {path: '/messages/:id', component: Message},
          {path: 'messages/:id',
            onEnter: function(nextState, repleceState){
              replaceState(null, '/messages/' + nextState.params.id)
            }}
        ]}
    ]
  }
]

render(<Router history={createBrowserHistory()} routes={routeConfig}/>,document.getElementById('basic'))
