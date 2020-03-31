import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/share/recommend.css';
import '../css/commonCss/iconfont.css';
import Share from '../js/components/share.js';
import UploadInfo from '../js/components/uploadInfo.js';
import serverUrl from '../js/modules/serverUrl.js';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      recommendData: [
        {
          id: '',
          editId: '',
          type: 'article',
          title: '',
          text: '',
          src: '',
          userName: '',
          readNum: '',
          time: ''
        }
      ]
    };
    this.handleDetail = this.handleDetail.bind(this);
  }
  handleDetail(e) {
    let target = e.target || e.srcElement;
    console.log(target.nodeName);
    // if (target.nodeName === "H3") {
    //   window.location.href = '/share/shareDetail.html?';
    // }
  }
  componentDidMount(){
    let that = this;
    fetch(serverUrl+'/share/getRecommendShare?page='+this.state.page,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      that.setState({
        recommendData: res.data
      })
    })
    .catch(err=> {
      console.log(err);
    })
  }
  render() {
    let recommendDataListItem = this.state.recommendData.map((item, index) =>
      <List key={index} listData={item} />
    );
    return (
      <Share>
        <ul onClick={this.handleDetail}>{recommendDataListItem}</ul>
      </Share>
    );
  }
}
class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let listItem = this.props.listData;
    switch (listItem.type) {
      case 'article':
        return (
          <li>
            <a href={"./shareDetail.html?type=article&id="+listItem.editId} target="_blank">
              <h3>{listItem.title}</h3>
              <p>{listItem.text}</p>
              <UploadInfo
                name={listItem.userName}
                time={listItem.time}
                viewNum={listItem.readNum}
                remarkNum={listItem.remarkNum}
              />
            </a>
          </li>
        );
        break;
      case 'video':
        return (
          <li>
            <a href={"./shareDetail.html?type=video&id="+listItem.editId} target="_blank">
              <h3>{listItem.title}</h3>
              <video src={serverUrl+''+listItem.src} controls="controls">您的浏览器不支持该视频播放</video>
              <p>{listItem.text}</p>
              <UploadInfo
                name={listItem.userName}
                time={listItem.time}
                viewNum={listItem.readNum}
                remarkNum={listItem.remarkNum}
              />
            </a>
          </li>
        );
        break;
      case 'audio':
        return (
          <li>
            <a href={"./shareDetail.html?type=audio&id="+listItem.editId} target="_blank">
              <h3>{listItem.title}</h3>
              <audio src={serverUrl+''+listItem.src} controls="controls">您的浏览器不支持该音频播放</audio>
              <p>{listItem.text}</p>
              <UploadInfo
                name={listItem.userName}
                time={listItem.time}
                viewNum={listItem.readNum}
                remarkNum={listItem.remarkNum}
              />
            </a>
          </li>
        );
        break;
    }
  }
}
ReactDOM.render(
  <Recommend />,
  document.getElementById('root')
);
