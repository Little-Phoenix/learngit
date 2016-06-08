import React from 'react'

let Countdown = React.createClass({
  getInitialState() {
    return {
      min1: 0,
      min2: 0,
      sec1: 0,
      sec2: 0,
      msec1: 0,
      msec2: 0
    }
  },
  render() {
    return (
      <div className="countdown">
        <p className="title">
          <i className="ico ico-countdown ico-countdown-gray"></i>
          <span>揭晓倒计时</span>
        </p>
        <p className="nums" pro="countdown">
          <b>{this.state.min1}</b>
          <b>{this.state.min2}</b>
          :
          <b>{this.state.sec1}</b>
          <b>{this.state.sec2}</b>
          :
          <b>{this.state.msec1}</b>
          <b>{this.state.msec2}</b>
        </p>
      </div>
    )
  },
  componentWillMount() {
    this.setState({
      time: Math.floor(this.props.time)
    })
  },
  componentDidMount() {
    this.doTimeDesc();
  },
  doTimeDesc() {
    var that = this;
    var min1 = Math.floor(that.state.time/(10*60*1000));
    var min2 = Math.floor((that.state.time-min1*10*60*1000)/(60*1000))
    var sec1 = Math.floor((that.state.time-min1*10*60*1000-min2*60*1000)/(10*1000))
    var sec2 = Math.floor((that.state.time-min1*10*60*1000-min2*60*1000-sec1*10*1000)/1000)
    var msec1 = Math.floor((that.state.time-min1*10*60*1000-min2*60*1000-sec1*10*1000-sec2*1000)/100)
    var msec2 = Math.floor((that.state.time-min1*10*60*1000-min2*60*1000-sec1*10*1000-sec2*1000-msec1*100)/10)

    that.setState({
      min1: min1,
      min2: min2,
      sec1: sec1,
      sec2: sec2,
      msec1: msec1,
      msec2: msec2,
      time: that.state.time - 10
    })

    if(that.state.time + 10){
      setTimeout(function(){
        that.doTimeDesc();
      },10)
    }
  }
})

export default Countdown
