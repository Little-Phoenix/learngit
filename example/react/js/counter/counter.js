import React, { Component, PropTypes } from 'react'

export default class Counter extends Component {
   render() {
     const { increment, decrement, counter } = this.props;
     return (
      <div className="innerDiv">
        Clicked: {counter} times
        <button onClick={increment}>递减</button>
        <button onClick={decrement}>递增</button>
      </div>
    )
   }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
}
