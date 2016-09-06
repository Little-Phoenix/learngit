// 参照swipe.js 修改其逻辑，将原来的横向滚动修改为竖向滚动
// 原理：
//   1. 不同于横向滚动，可以设置每个元素的left，竖向滚动，不需要设置元素的top（而且通过top、left设置元素的位置，需要占用的资源比设置translate多）；
//   2. 滚动的元素需要设置为position: absolute
//   3. 记得把设置父元素的overflow：hidden哦！
//   4. 轮转时，只要设置当前元素、当前元素的前一元素（pre），当前元素的后一元素（next）的translateY的值，
//      其中需要翻转到最后的元素的轮转动画时场需设置为0，这样从前一元素到后一元素的过程则不会扰乱当前的动画效果（否则则会有向上的动画和向下的动画）
//   5. setTimeout(begin, auto) : 第一页显示auto时长后，再轮转
//   6. transitionEnd(event): 在transition执行完毕后，可以对完毕事件：transitionEnd进行监听, 并再次执行begin()函数，重复此动作即完成了该动画


  //初始化
  function sliderV(container, options){

    var noop = function(){};
    var offloadFn = function(fn){
      setTimeout(fn || noop, 0);
    }

    if(!container)  return;//如果没有传容器，则不再继续；
    var element = container.children[0];//所有子元素的父容器

    var slides, slidePos, height, length;
    options = options || {};
    var index = parseInt(options.startSlide, 10) || 0;//序号，十进制
    var speed = options.speed || 300;//默认轮转速度

    options.continuous = options.continuous !== undefined ? options.continuous : true;//是否重复执行；
    options.autoRestart = options.autoRestart !== undefined ? options.autoRestart : true;//用户点击后是否从头开始轮转

    function setup(){
      slides = element.children;//轮转元素
      length = slides.length;//元素个数
      //如果只有一个元素，则停止轮转
      if(slides.length < 2) options.continuous = false;

      //如果只有两个元素，则为其增加两个元素；
      if(slides.length < 3){
        element.appendChild(slides[0].cloneNode(true));
        element.appendChild(element.children[1].cloneNode(true));
        slides = element.children;
      }

      //创建一个数组，保存当前位置的所有轮转元素
      slidePos = new Array(slides.length);

      //设置父容器的总高；
      height = container.getBoundingClientRect().height || container.offsetHeight;
      element.style.height = (slides.length * height) + 'px';

      //元素栈
      var pos = slides.length;
      while( pos-- ){

        var slide = slides[pos];
        slide.style.height = height + 'px';
        slide.setAttribute('data-index', pos);

        move(pos, index > pos ? -height : (index < pos ? height : 0), 0)
      }
      if (options.continuous){
        move(circle(index-1), height, 0);
        move(circle(index+1), -height, 0);
      }

      element.style.top = (index * -height) + 'px';

      container.style.visibility = 'visible';
    }

    function move(index, dist, speed){
      translate(index, dist, speed);
      slidePos[index] = dist;
    }

    function translate(index, dist, speed){
      var slide = slides[index];
      var style = slide && slide.style;

      if(!style) return;

      style.webkitTransitionDuration =
      style.MozTransitionDuration =
      style.msTransitionDuration =
      style.OTransitionDuration =
      style.transitionDuration = speed + 'ms';

      style.webkitTransform = 'translateX(0) translateY(' + dist + 'px)' + 'translateZ(0)';
      style.msTransform =
      style.MozTransform =
      style.OTransform = 'translateY(' +dist+ 'px)';
    }

    function circle(index){
      return (slides.length + (index % slides.length)) % slides.length;
    }

    function prev(){
      if(options.continuous) slide(index-1);
      else if (index) slide(index-1);
    }

    function next(){
      if(options.continuous) slide(index + 1);
      else if(index < slides.length -1) slide(index + 1);
    }

    function slide(to, slideSpeed){
      //如果当前页面就是要进入的页面，则什么都不做
      if(index === to) return;
      // 判断当前动画的方向1: backward, -1: forward
      var direction = Math.abs(index-to) / (index-to);

      // 获取元素的真实位置
      if (options.continuous) {
        var natural_direction = direction;
        direction = -slidePos[circle(to)] / height;

        //如果动画方向是forward 但是to<index, to = slides.length + to
        //如果动画方向是backward 但是to > index, to = -slides.length + to
        if (direction !== natural_direction) to =  -direction * slides.length + to;

      }

      var diff = Math.abs(index-to) - 1;

      // 如果连续跳转，则需要将连续的部分都进行轮转
      while (diff--) move( circle((to > index ? to : index) - diff - 1), height * direction, 0);

      to = circle(to);

      move(index, height * direction, slideSpeed || speed);
      move(to, 0, slideSpeed || speed);

      if (options.continuous){
        move(circle(to - direction), -(height * direction), 0);
      }


      index = to;
      offloadFn(options.callback && options.callback(index, slides[index]));
    }

    //当前页显示时间
    var delay = options.auto || 0;

    var interval;

    function begin(){
      if(delay > 0){
        interval = setTimeout(next, delay);
      }
    }

    function stop(){
      delay = 0;
      clearTimeout(interval);
    }

    function restart(){
      stop();
      delay = options.auto || 0;
      begin();
    }

    setup();
    if(delay){
      begin();
    }

    var events = {
      handleEvent: function(event){
        switch (event.type) {
          case 'touchstart':
            this.start(event);
            break;
          case 'touchmove':
            this.move(event);
            break;
          case 'touchend':
            offloadFn(this.end(event));
            break;
          case 'webkitTransitionEnd':
          case 'msTransitionEnd':
          case 'oTransitionEnd':
          case 'otransitionend':
          case 'transitionend':
            offloadFn(this.transitionEnd(event));
            break;
          case 'resize' :
            offloadFn(setup);
            break;
        }
      },
      start: function(event){

      },
      end: function(event){

      },
      transitionEnd: function(event){
        if(parseInt(event.target.getAttribute('data-index'), 10) == index){
          if( delay || options.autoRestart) restart();
          options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
        }
      }
    }

    element.addEventListener('transitionend', events, false);
  }
