import React, { Component } from 'react';
import Chat from './chat.js';
import Adsence from '../adsence.js';

class Fruit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitList: [
        {
          title: '适合熬夜族的水果',
          fruits: "苹果、杨桃、橙子、柠檬、葡萄、香蕉",
          text: ''
        },
        {
          title: '早上最宜吃的水果',
          fruits: '苹果、梨、葡萄',
          text: '早上吃水果，可帮助消化吸收，有利通便，而且水果的酸甜滋味，可让人一天都感觉神清气爽。人的胃肠经过一夜的休息之后，功能尚在激活中，消化功能不强。因此酸性不太强、涩味不太浓的水果，比如苹果、梨、葡萄等就非常适合。'
        },
        {
          title: '饭后最宜吃的水果',
          fruits: '菠萝、木瓜、猕猴桃、橘子、山楂',
          text: '菠萝中含有的菠萝蛋白酶能帮助消化蛋白质，补充人体内消化酶的不足，增强消化功能。李时珍在《本草纲目》中也肯定，菠萝可以健脾胃、固元气。餐后吃些菠萝，能开胃顺气，解油腻，助消化。木瓜中的木瓜酵素可帮助人体分解肉类蛋白质，饭后吃少量的木瓜，对预防胃溃疡、肠胃炎、消化不良等都有一定的功效。猕猴桃、橘子、山楂等，富含大量有机酸，能增加消化酶活性，促进脂肪分解，帮助消化。'
        },
        {
          title: '夜宵安神水果',
          fruits: '桂圆',
          text: '夜宵吃水果既不利于消化，又因为水果含糖过多，容易造成热量过剩，导致肥胖。尤其是入睡前吃纤维含量高的水果，充盈的胃肠会使睡眠受到影响对肠胃功能差的人来说，更是有损健康。但如果睡眠不好，可以吃几颗桂圆，它有安神助眠的作用，能让你睡得更香。'
        },
        {
          title: '美容水果',
          fruits: '木瓜、猕猴桃、西柚、柠檬、香蕉、苹果、草莓、批把、火龙果、樱桃',
          text: ''
        },
        {
          title: '夏季降火水果',
          fruits: '梨、香蕉、苹果、猕猴桃、西瓜',
          text: ''
        }
      ]
    };
  }
  render() {
    let lists = this.state.fruitList;
    let listItem = lists.map((item, index) =>
      <li key={index}>
        <h4>{item.title}</h4>
        <p>{item.fruits}</p>
        <p>{item.text}</p>
      </li>
    );
    return (
      <div id="fruit-eat">
        <h3>
          水果健康吃
          <p>eat fruit healthily</p>
        </h3>
        <ul>{listItem}</ul>
      </div>
    );
  }
}
class Juice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      juiceList: [
        {
          name: '木瓜汁',
          text: '消滞润肺，帮助消化蛋白质。'
        },
        {
          name: '西瓜汁',
          text: '消暑利尿，降血压。'
        },
        {
          name: '西芹汁',
          text: '补充体力，舒缓焦虑、压力。'
        },
        {
          name: '香蕉汁',
          text: '提高精力，强健肌肉，滋润肺肠，血脉畅通。'
        },
        {
          name: '葡萄汁',
          text: '调节心跳、补血安神，加强肾、肝功能，帮助消化。'
        },
        {
          name: '柠檬汁',
          text: '含丰富维他命C，止咳化痰，有助排除体内毒素。'
        },
        {
          name: '橙汁',
          text: '滋润健胃，强化血管，可预防心脏病、中风、伤风、感冒和瘀伤。'
        },
        {
          name: '梨汁',
          text: '能维持心脏，血管正常运作，去除体内毒素。'
        },
        {
          name: '椰子汁',
          text: '预防心脏病，关节炎和癌症，强奸肌肤，滋润止咳。'
        },
      ]
    };
  }
  render() {
    let lists = this.state.juiceList;
    let listItem = lists.map((item, index) =>
      <li key={index}>
        <h4>{item.name}</h4>
        <p>{item.text}</p>
      </li>
    );
    return (
      <div id="juice-drink">
        <h3>果汁功效<p>juice efficiency</p></h3>
        <ul>{listItem}</ul>
      </div>
    );
  }
}
class ContentRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToggle: true
    };
  }
  componentDidMount(){
    var oHtml = document.documentElement;
    if(parseInt(oHtml.getBoundingClientRect().width) < 500){
      this.setState({
        showToggle: false
      });
    }else {
      this.setState({
        showToggle: true
      });
    }
    window.addEventListener('resize',()=>{
      if(parseInt(oHtml.getBoundingClientRect().width) < 500){
        this.setState({
          showToggle: false
        });
      }else {
        this.setState({
          showToggle: true
        });
      }
    })
  }
  render() {
    return (
      <div id="content-right">
        {
           this.state.showToggle?
            <React.Fragment>
              <Fruit />
              <Juice />
              <Adsence />
              <Chat />
            </React.Fragment>
            :
            <div>
              <i className="iconfont icon-fenlei menu"></i>
              
            </div>
        }
      </div>
    );
  }
}

export default ContentRight;