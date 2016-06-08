webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(37);

	var _countdown = __webpack_require__(245);

	var _countdown2 = _interopRequireDefault(_countdown);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var element = document.getElementById('countdown');

	(0, _reactDom.render)(_react2.default.createElement(_countdown2.default, { time: '601000' }), element);

/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	var Countdown = _react2.default.createClass({
	  displayName: "Countdown",
	  getInitialState: function getInitialState() {
	    return {
	      min1: 0,
	      min2: 0,
	      sec1: 0,
	      sec2: 0,
	      msec1: 0,
	      msec2: 0
	    };
	  },
	  render: function render() {
	    return _react2.default.createElement("div", { className: "countdown" }, _react2.default.createElement("p", { className: "title" }, _react2.default.createElement("i", { className: "ico ico-countdown ico-countdown-gray" }), _react2.default.createElement("span", null, "揭晓倒计时")), _react2.default.createElement("p", { className: "nums", pro: "countdown" }, _react2.default.createElement("b", null, this.state.min1), _react2.default.createElement("b", null, this.state.min2), ":", _react2.default.createElement("b", null, this.state.sec1), _react2.default.createElement("b", null, this.state.sec2), ":", _react2.default.createElement("b", null, this.state.msec1), _react2.default.createElement("b", null, this.state.msec2)));
	  },
	  componentWillMount: function componentWillMount() {
	    this.setState({
	      time: Math.floor(this.props.time)
	    });
	  },
	  componentDidMount: function componentDidMount() {
	    this.doTimeDesc();
	  },
	  doTimeDesc: function doTimeDesc() {
	    var that = this;
	    var min1 = Math.floor(that.state.time / (10 * 60 * 1000));
	    var min2 = Math.floor((that.state.time - min1 * 10 * 60 * 1000) / (60 * 1000));
	    var sec1 = Math.floor((that.state.time - min1 * 10 * 60 * 1000 - min2 * 60 * 1000) / (10 * 1000));
	    var sec2 = Math.floor((that.state.time - min1 * 10 * 60 * 1000 - min2 * 60 * 1000 - sec1 * 10 * 1000) / 1000);
	    var msec1 = Math.floor((that.state.time - min1 * 10 * 60 * 1000 - min2 * 60 * 1000 - sec1 * 10 * 1000 - sec2 * 1000) / 100);
	    var msec2 = Math.floor((that.state.time - min1 * 10 * 60 * 1000 - min2 * 60 * 1000 - sec1 * 10 * 1000 - sec2 * 1000 - msec1 * 100) / 10);

	    that.setState({
	      min1: min1,
	      min2: min2,
	      sec1: sec1,
	      sec2: sec2,
	      msec1: msec1,
	      msec2: msec2,
	      time: that.state.time - 10
	    });

	    if (that.state.time + 10) {
	      setTimeout(function () {
	        that.doTimeDesc();
	      }, 10);
	    }
	  }
	});

	exports.default = Countdown;

/***/ }

});