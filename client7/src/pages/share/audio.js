import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/share/audio.css';
import '../css/commonCss/iconfont.css';
import Share from '../js/components/share.js';
import UploadInfo from '../js/components/uploadInfo.js';
import serverUrl from '../js/modules/serverUrl.js';

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      audioData: [
        // {
        //   title: '这是一个音频',
        //   type: 'audio',
        //   text: '这是一个神奇的音频',
        //   src: '',
        //   name: 'qpq',
        //   time: '2018.03.20',
        //   viewNum: 32,
        //   remarkNum: 32
        // }
      ]
    };
  }
  componentDidMount(){
    let that = this;
    fetch(serverUrl+'/share/getAllAudio?page='+this.state.page,{
      method: 'get',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      switch(res.status){
        case 'success':
          that.setState({
            audioData: res.data
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
    let audioListItem = this.state.audioData.map((item, index) =>
      <li>
        <a href={'./shareDetail.html?type=audio&id='+item.editId} target="_blank">
        <h3>{item.title}</h3>
        <audio src={serverUrl+item.src} controls="controls">您的浏览器不支持该音频播放</audio>
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
        <ul>{audioListItem}</ul>
      </Share>
    );
  }
}
ReactDOM.render(
  <Audio />,
  document.getElementById('root')
);
