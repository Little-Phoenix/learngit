webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(37);

	var _good = __webpack_require__(418);

	var _good2 = _interopRequireDefault(_good);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var element = document.getElementById('good');

	(0, _reactDom.render)(_react2.default.createElement(_good2.default, null), element);

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var Good = _react2.default.createClass({
	  displayName: 'Good',
	  render: function render() {
	    return _react2.default.createElement('div', { className: 'goods-info' }, _react2.default.createElement('div', { className: 'goodpic' }, _react2.default.createElement('a', { href: '#', target: '_blank' }, _react2.default.createElement('img', { src: '2.jpg', alt: '', width: '200px', height: '200px' }))), _react2.default.createElement('p', { className: 'good-title f-txtabb' }, _react2.default.createElement('a', { href: '#' }, '1箱12罐 | Coca-Cola 可口可乐 限量版 250毫升/罐')), _react2.default.createElement('p', { className: 'good-price' }, '总需：175人次'), _react2.default.createElement('p', { className: 'good-period' }, '期号：306081666'));
	  }
	});

/***/ }

});