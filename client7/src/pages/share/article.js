import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/share/article.css';
import '../css/commonCss/iconfont.css';
import Share from '../js/components/share.js';
import UploadInfo from '../js/components/uploadInfo.js'
import { WSATYPE_NOT_FOUND } from 'constants';
import serverUrl from '../js/modules/serverUrl.js';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      articleData: [
        // {
        //   title: '全球最厉害的 14 位程序员，请收下我的膝盖~',
        //   type: 'article',
        //   text: '年仅11岁时便参加国际信息学奥林比克竞赛，创造了最年轻选手的记录。在2007-2012年间，总共取得6枚奥赛金牌；2013年美国计算机协会编程比赛冠军队成员；2014年Facebook黑客杯冠军得主。截止目前，稳居俄编程网站Codeforces声望第一的宝座，在TopCoder算法竞赛中暂列榜眼位置。',
        //   src: '',
        //   name: 'qpq',
        //   time: '2018.03.20',
        //   readNum: 32,
        //   remarkNum: 32
        // }
      ]
    };
  }
  componentDidMount(){
    let that = this;
    fetch(serverUrl+'/share/getAllArticle?page='+this.state.page,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            articleData: res.data
          })
          break;
        case 'fail':
          alert(res.msg);
          break;
      }
    })
    .catch(err=> {
      console.log(err);
    })
  }
  render() {
    let articleDataListItem = this.state.articleData.map((item, index) =>
      <li key={index}>
        <a href={'./shareDetail.html?type=article&id='+item.editId} target="_blank">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <UploadInfo
            name={item.userName}
            time={item.time}
            viewNum={item.readNum}
            remarkNum={item.remarkNum}
          />
        </a>
      </li>
    );
    return (
      <Share>
        <ul>{articleDataListItem}</ul>
      </Share>
    );
  }
}
ReactDOM.render(
  <Article />,
  document.getElementById('root')
);
