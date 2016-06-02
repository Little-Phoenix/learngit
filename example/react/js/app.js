import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Link, Route ,browserHistory} from 'react-router';

import HelloHandler from './hello.js';
// import Forms from './form.js';
import Timer from './timer.js';
import Menu from './menu.js';
import Data from './data.js';
import Form from './form.js';

let App = React.createClass({
  render() {
    return (
      <div className="nav">
        <Link to="/hello" className="hellolink">Say Hello</Link>
        <Link to="/timer" className="timerlink">Timer</Link>
        <Link to="/data" className="datalink">Data Growth</Link>
        <Link to="/form" className="formlink">Form</Link>
        {this.props.children}
      </div>
    );
  }
});

let routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/hello" component={HelloHandler} />
      <Route path="/timer" component={Timer}/>
      <Route path="/data" component={Data} />
      <Route path="/form" component={Form} />
    </Route>
  </Router>
)

render(routes, document.getElementById('content'));
