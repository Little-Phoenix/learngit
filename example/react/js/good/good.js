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
        <div className="progressbar" >
          <p className="progress-bar-wrap" title="20%">
            <span className="progress-bar-bar" style={{width: '20%'}}>
            </span>
          </p>
          <ul className="progressbar-txt f-clear" style={{display: 'none'}}>
            <li className="progressbar-txt-l">
              <p>
                <b>524</b>
              </p>
              <p>已参与人次</p>
            </li>
            <li className="progressbar-txt-r">
              <p>
                <b>524</b>
              </p>
              <p>剩余人次</p>
            </li>
          </ul>
          <p className="progressbar-txt">
            已完成31%，剩余<strong>81</strong>
          </p>
        </div>
        <div className="goods-opr">
          <a className="button goods-quickBuy" href="javascript:void(0)" title="立即夺宝">立即夺宝
          </a>
        </div>
      </div>
    )
  }
})

export default Good
