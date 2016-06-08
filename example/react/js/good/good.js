import React from 'react'

let Good = React.createClass({
  render() {
    return (
      <div className='goods-info'>
        <div className="goodpic">
          <a href="#" target="_blank">
            <img src="2.jpg" alt="" width="200px" height="200px"/>
          </a>
        </div>
        <p className="good-title f-txtabb">
          <a href="#">
            1箱12罐 | Coca-Cola 可口可乐 限量版 250毫升/罐
          </a>
        </p>
        <p className="good-price">
          总需：175人次
        </p>
        <p className="good-period">
          期号：306081666
        </p>
      </div>
    )
  }
})

export default Good
