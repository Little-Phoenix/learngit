webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(37);

	var _reactRouter = __webpack_require__(167);

	var _createBrowserHistory = __webpack_require__(225);

	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var Basic = _react2.default.createClass({
	  displayName: 'Basic',
	  render: function render() {
	    return _react2.default.createElement('div', null, _react2.default.createElement('h1', null), _react2.default.createElement('ul', null, _react2.default.createElement('li', null, ' ', _react2.default.createElement(_reactRouter.Link, { to: '/about' }, 'About'), ' '), _react2.default.createElement('li', null, ' ', _react2.default.createElement(_reactRouter.Link, { to: '/inbox' }, 'Inbox'), ' ')), this.props.children);
	  }
	});

	var About = _react2.default.createClass({
	  displayName: 'About',
	  render: function render() {
	    return _react2.default.createElement('h3', null, 'About');
	  }
	});

	var Inbox = _react2.default.createClass({
	  displayName: 'Inbox',
	  render: function render() {
	    return _react2.default.createElement('div', null, _react2.default.createElement('h2', null, 'Inbox'), this.props.children || "Welcome to your Inbox");
	  }
	});

	var Message = _react2.default.createClass({
	  displayName: 'Message',
	  render: function render() {
	    return _react2.default.createElement('h3', null, 'Message ', this.props.params.id, ' ');
	  }
	});

	var Dashboard = _react2.default.createClass({
	  displayName: 'Dashboard',
	  render: function render() {
	    return _react2.default.createElement('div', null, 'Welcome to the app!');
	  }
	});

	var routeConfig = [{
	  path: '/',
	  component: Basic,
	  indexRoute: { component: Dashboard },
	  childRoutes: [{ path: 'about', component: About }, { path: 'inbox', component: Inbox,
	    childRoutes: [{ path: '/messages/:id', component: Message }, { path: 'messages/:id',
	      onEnter: function onEnter(nextState, repleceState) {
	        replaceState(null, '/messages/' + nextState.params.id);
	      } }] }]
	}];

	(0, _reactDom.render)(_react2.default.createElement(_reactRouter.Router, { history: (0, _createBrowserHistory2.default)(), routes: routeConfig }), document.getElementById('basic'));

/***/ }
]);