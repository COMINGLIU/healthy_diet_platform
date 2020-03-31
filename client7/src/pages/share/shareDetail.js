import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/share/shareDetail.css';
import '../css/commonCss/iconfont.css';
import Share from '../js/components/share.js';
import UploadInfo from '../js/components/uploadInfo.js';
import Remark from '../js/components/remark.js';
import Option from '../js/modules/option.js';
import serverUrl from '../js/modules/serverUrl.js';

class ShareDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // article  video   audio
      substanceType: "article",
      loginY: false,
      substance: {
        id: '',
        authorId: '',
        title: '',
        text: '',
        src: '',
        name: '',
        time: '',
        viewNum: 0,
        remarkNum: 0
      },
      remark: [
        // {
        //   editrecordId: '',
        //   remarkId: '',
        //   userId: '',
        //   userName: '大哈',
        //   remarkText: '可是此刻舍不得吃可是不错的开始',
        //   remarkTime: '2019.04.08 11:24:00',
        //   reply: [
        //     {
        //       remarkId: '',
        //       replyId: '',
        //       userId: '',
        //       beReplyedUserId: '',
        //       userName: '小哈',
        //       replyText: '四是上次上课',
        //       replyTime: '2019.04.08  13:57:10'
        //     }
        //   ]
        // }
      ]
    };
    this.addNewRemark = this.addNewRemark.bind(this);
    this.addNewReply = this.addNewReply.bind(this);
    this.delReply = this.delReply.bind(this);
    this.delRemark =this.delRemark.bind(this);
  }
  addNewRemark(config){ 
    let newRemark = this.state.remark;
    newRemark.unshift(config);
    this.setState({
      remark: newRemark
    })
  }
  addNewReply(index,config){
    let newRemark = this.state.remark;
    newRemark[index].reply.unshift(config);
    this.setState({
      remark: newRemark
    })
  }
  delReply(config){
    let newRemark = this.state.remark;
    newRemark[config.remarkIndex].reply.splice(config.replyIndex,1);
    this.setState({
      remark: newRemark
    })
  }
  delRemark(config){
    let newRemark=this.state.remark;
    newRemark.splice(config.remarkIndex,1);
    this.setState({
      remark: newRemark
    })
  }
  componentDidMount(){
    let options = {};
    let that = this;
    if(window.location.search){
      options = Option(window.location.search.split('?')[1]);
      console.log(options);
      this.setState({
        substanceType: options.type
      })
      fetch(serverUrl+'/share/getShareDetail?type='+options.type+'&id='+options.id,{
        method: 'get',
        mode: 'cors',
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let getData = res.data;
        switch(res.status) {
          case 'success':
            switch(options.type){
              case 'article':
                that.setState({
                  substance: {
                    id: getData.id,
                    authorId: getData.userId,
                    title: getData.title,
                    text: getData.text,
                    src: '',
                    name: getData.userName,
                    time: getData.time.split(' ')[0],
                    viewNum: getData.readNum,
                    remarkNum: 10
                  },
                  remark: getData.remark
                })
                document.getElementById('article').innerHTML = getData.text;
                break;
              case 'video':
                that.setState({
                  substance: {
                    id: getData.id,
                    authorId: getData.userId,
                    title: getData.title,
                    text: getData.text,
                    src: decodeURIComponent(serverUrl+''+getData.src),
                    name: getData.userName,
                    time: getData.time.split(' ')[0],
                    viewNum: getData.readNum,
                    remarkNum: 10
                  },
                  remark: getData.remark
                })
                break;
              case 'audio':
                console.log(getData.src);
                console.log(decodeURIComponent(getData.src));
                that.setState({
                  substance: {
                    id: getData.id,
                    authorId: getData.userId,
                    title: getData.title,
                    text: getData.text,
                    src: decodeURIComponent(serverUrl+''+getData.src),
                    name: getData.userName,
                    time: getData.time.split(' ')[0],
                    viewNum: getData.readNum,
                    remarkNum: 10
                  },
                  remark: getData.remark
                })
                break;
            }
            break;
          case 'fail':
            alert(res.msg);
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  render() {
    return (
      <Share>
        <ContentRender
          format={this.state.substanceType}
          title={this.state.substance.title}
          text={this.state.substance.text}
          src={this.state.substance.src}
        />
        <UploadInfo
          name={this.state.substance.name}
          time={this.state.substance.time}
          viewNum={this.state.substance.viewNum}
          remarkNum={this.state.remark.length}
        />
        <Remark
          loginY={this.state.loginY}
          handleGotoLogin = {this.props.handleGotoLogin}
          editrecordId={this.state.substance.id}
          authorId={this.state.substance.authorId}
          shareTitle={this.state.substance.title}
          remark={this.state.remark}
          addNewRemark={this.addNewRemark}
          addNewReply={this.addNewReply}
          delReply={this.delReply}
          delRemark={this.delRemark}
        />
      </Share>
    );
  }
}
class ContentRender extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    switch (this.props.format) {
      case 'article':
        return (
          <section>
            <h1>{this.props.title}</h1>
            {/* {this.props.text} */}
            <div id="article"></div>
          </section>
        );
        break;
      case 'video':
        return (
          <section>
            <h1>{this.props.title}</h1>
            <div className="video">
              <video controls="controls" src={this.props.src}>
                您的浏览器不支持视频播放
              </video>
            </div>
            <p>{this.props.text}</p>
          </section>
        );
        break;
      case 'audio':
        return (
          <section>
            <h1>{this.props.title}</h1>
            <div className="audio">
              <audio controls="controls" src={this.props.src}>
                您的浏览器不支持音频播放
              </audio>
            </div>
            <p>{this.props.text}</p>
          </section>
        );
        break;
    }
  }
}
ReactDOM.render(
  <ShareDetail />,
  document.getElementById('root')
);
