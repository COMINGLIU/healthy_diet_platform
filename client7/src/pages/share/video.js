import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/share/video.css';
import '../css/commonCss/iconfont.css';
import Share from '../js/components/share.js';
import UploadInfo from '../js/components/uploadInfo.js';
import serverUrl from '../js/modules/serverUrl.js';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      videoData: [
        // {
        //   title: '这是一个视频',
        //   type: 'video',
        //   text: '在选取10个奇异值时，能大概看出蝴蝶轮廓；在选取30个奇异值时，蝴蝶已经成型，但是存在很明显的噪声点；',
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
    fetch(serverUrl+'/share/getAllVideo?page='+this.state.page,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            videoData: res.data
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
    let videoDataListItem = this.state.videoData.map((item, index) =>
      <li>
        <a href={'./shareDetail.html?type=video&id='+item.editId} target="_blank">
          <h3>{item.title}</h3>
          <video src={serverUrl+''+item.src} controls="controls">您的浏览器不支持该视频播放</video>
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
        <ul>{videoDataListItem}</ul>
      </Share>
    );
  }
}
ReactDOM.render(
  <Video />,
  document.getElementById('root')
);
