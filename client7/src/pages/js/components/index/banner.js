import React, { Component } from 'react';
import banner1 from '../../../images/bg1.jpg';
import banner2 from '../../../images/bg2.jpg';
// import banner3 from '../../../images/bg3.jpg';
import banner4 from '../../../images/bg4.jpg';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*
      *轮播图片设置
      *   url: 图片路径
      *   to:图片链接去处
      *   styleNow:class类
      */
      imgUrl: [
        {
          url: banner1,
          text: '什么样的体质吃什么样的食材',
          textEn: "The ingredients depend on everyone's physique.",
          link: '/articlePhysical.html',
          styleNow: 'checkSwiper-new'
        }, {
          url: banner2,
          text: '春夏秋冬四季食谱',
          textEn: 'Recipes for Spring, Summer, Autumn and Winter.',
          link: '/articleSeason.html',
          styleNow: 'checkSwiper-last'
        }, {
          url: banner1,
          text: '食品搭配禁忌你知道多少',
          textEn: 'How much do you know about food matching taboos?',
          link: '/articleAvoid.html',
          styleNow: 'checkSwiper-last'
        }, {
          url: banner4,
          text: '蔬菜营养成分介绍',
          textEn: 'Introduction of Nutritional Components of Vegetables.',
          link: '/articleNutrition.html',
          styleNow: 'checkSwiper-last'
        }
      ],
      // 切换图片的按钮，下边是1,2,3,4个按钮分别对应的类名
      checkPoint: [
        'newPoint',
        'oldPoint',
        'oldPoint',
        'oldPoint'
      ]
    };
    // 点击按钮切换轮播图片的方法
    this.clickSwiperHandle = this.clickSwiperHandle.bind(this);
  }
  // 在此处开启定时器开始自动轮播
  componentDidMount() {
    let count = 1;
    let sum = this.state.imgUrl.length;
    this.timerId = setInterval(
      () => {
        this.autoSwiper(count);
        count < sum - 1 ? count++ : count = 0;
      },
      6000
    );
  }
  // 在此处去除定时器
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  // 轮播方法的内部实现
  autoSwiper(count) {
    let aimImgUrl = this.state.imgUrl;
    let newImgArr = [];
    let aimCheckPoint = this.state.checkPoint;
    let newCheckPoint = [];
    for (let i = 0, len = this.state.imgUrl.length; i < len; i++) {
      if (i !== count) {
        if (i === count + 1) {
          newImgArr.push(this.checkSwiper(aimImgUrl[i], 'checkSwiper-next'));
        } else {
          newImgArr.push(this.checkSwiper(aimImgUrl[i], 'checkSwiper-last'));
        }
      } else {
        newImgArr.push(this.checkSwiper(aimImgUrl[count], 'checkSwiper-new'));
      }
    }
    for (let j = 0, len = aimCheckPoint.length; j < len; j++) {
      if (j !== count) {
        newCheckPoint.push('oldPoint');
      } else {
        newCheckPoint.push('newPoint');
      }
    }
    this.setState({
      imgUrl: newImgArr,
      checkPoint: newCheckPoint
    });
  }
  // 切换每张图片state状态的方法
  checkSwiper(aim, classNm) {
    let res = Object.assign({}, aim, { styleNow: classNm });
    return res;
  }
  // 按钮点击方法内部实现
  clickSwiperHandle(count) {
    clearInterval(this.timerId);
    this.autoSwiper(count);
    let sum = this.state.imgUrl.length;
    let num = count + 1 <= sum-1?count+1:0;
    this.timerId = setInterval(
      () => {
        this.autoSwiper(num);
        num < sum - 1 ? num++ : num = 0;
      },
      6000
    );
  }
  // 渲染
  render() {
    let lists = this.state.imgUrl;
    let listItems = lists.map((item, index) =>
      <li key={index} className={item.styleNow}>
        <img src={item.url} alt="img"/>
        <div className="banner-value-bg">
          <div className="banner-value">
            <h3>{item.text}</h3>
            <span>{item.textEn}</span>
          </div>
          <a href={item.link} target="_blank"><p className="read-more">Read More</p></a>
        </div>
      </li>
    );
    let pointsClass = this.state.checkPoint;
    let checkPoints = pointsClass.map((item, index) =>
      <span key={index} className={item} onClick={(e) => this.clickSwiperHandle(index, e)}></span>
    );
    return (
      <div id="banner">
        <ul id="swiper">{listItems}</ul>
        <div className="checkBtn">
          {checkPoints}
        </div>
        {/* <div className="banner-cover"></div> */}
      </div>
    );
  }
}
export default Banner;