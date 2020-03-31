import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/commonCss/reset.css';
import '../css/commonCss/iconfont.css';
import '../css/share/edit.css';
import Share from '../js/components/share.js';
import Editor from 'wangeditor';
import Option from '../js/modules/option.js';
import Recorder from '../js/modules/recorder.js';
import serverUrl from '../js/modules/serverUrl.js';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFormat: "article",
      loginOpenToggle: false,
      editOkToggle: false,
      checkLink: '',
      reEditLink: '',
      editFormatChoose: [
        {
          title: "article",
          text: '文章',
          icon: 'iconfont icon-xiezuo',
          choosedClass: 'article-choosed',
          choosedNoClass: 'article-no-choosed'
        },
        {
          title: "video",
          text: '视频',
          icon: 'iconfont icon-bofang',
          choosedClass: 'video-choosed',
          choosedNoClass: 'video-no-choosed'
        },
        {
          title: 'audio',
          text: '音频',
          icon: 'iconfont icon-huihua',
          choosedClass: 'audio-choosed',
          choosedNoClass: 'audio-no-choosed'
        }
      ]
    };
    this.handleEditFormatChoose = this.handleEditFormatChoose.bind(this);
    // 重新编辑
    this.handleReEdit = this.handleReEdit.bind(this);
    // 编辑文章提交成功
    this.articleSubOk = this.articleSubOk.bind(this);
    // 编辑视频提交成功
    this.videoSubOk = this.videoSubOk.bind(this);
    // 编辑音频成功
    this.audioSubOk = this.audioSubOk.bind(this);
  }
  handleEditFormatChoose(e) {
    let target = e.target || e.srcElement;
    if (target.nodeName === "LI") {
      if(this.state.editOkToggle){
        this.setState({
          editFormat: target.dataset.name,
          editOkToggle: false,
          checkLink: '',
          reEditLink: ''
        })
      }
      this.setState({
        editFormat: target.dataset.name
      });
    }
  }
  // 重新编辑
  handleReEdit(){
    let editType = this.state.editFormat;
    // document.getElementById(editType).style.display = 'block';
    console.log('重新编辑');
    window.location.href="http://localhost:8080/share/edit.html?type="+this.state.editFormat+"&id="+this.state.hrefId;
  }
  // 文章编辑成功
  articleSubOk(articleId){
    console.log(articleId);
    this.setState({
      editOkToggle: true,
      hrefId: articleId,
      reEditLink: './edit.html?type=article&id='+articleId,
      checkLink: './shareDetail.html?type=article&id='+articleId
    })
  }
  // 视频编辑成功
  videoSubOk(videoId){
    console.log(videoId);
    this.setState({
      editOkToggle: true,
      reEditLink: './edit.html?type=video&id='+videoId,
      checkLink: './shareDetail.html?type=video&id='+videoId
    })
  }
  // 视频编辑成功
  audioSubOk(audioId){
    console.log(audioId);
    this.setState({
      editOkToggle: true,
      hrefId: audioId,
      reEditLink: './edit.html?type=audio&id='+audioId,
      checkLink: './shareDetail.html?type=audio&id='+audioId
    })
  }
  componentDidMount(){
    let options = {};
    // type  id
    if(window.location.search){
      let searchStr = window.location.search.split('?')[1];
      options=Option(searchStr);
      console.log('options:',options);
      this.setState({
        editFormat: options.type
      })
    }
  }
  render() {
    let editFormatChooseListItem = this.state.editFormatChoose.map(item =>
      <li key={item}
       className={item.title===this.state.editFormat?item.choosedClass:item.choosedNoClass}
       data-name={item.title}
      >
        <i className={item.icon}></i>
        {item.text}
      </li>
    );
    let exitLogin = this.props.exitLogin;
    return (
      <Share >
        <div className="edit-format-choose" onClick={this.handleEditFormatChoose}>
          <ul>{editFormatChooseListItem}</ul>
        </div>
        <div id="editBox">
          {
            this.state.editOkToggle?
            <SubOkView 
              checkLink={this.state.checkLink} 
              reEditLink={this.state.reEditLink}
              />
              :
              <EditChooseRender 
              format={this.state.editFormat} 
              articleSubOk={this.articleSubOk}
              videoSubOk={this.videoSubOk}
              audioSubOk={this.audioSubOk}
            />
          }
        </div>
      </Share>
    );
  };
}
class ArticleEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      editor: {},
      // 可获取编辑框内的格式文本
      articleText: '',
      articleId: ''
    };
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleArticleSub = this.handleArticleSub.bind(this);
  }
  handleTitleInput(e){
    let target = e.target;
    this.setState({
      title: target.value
    })
  }
  handleArticleSub(){
    let articleTitle = this.state.title;
    let editorText = this.state.editor.txt.html();
    let that = this;
    console.log(editorText);
    // data-*自定义属性会自动转换为小写
    let articleId = document.getElementById('article').dataset.articleid;
    console.log(articleId);
    if(!articleId){
      // 新编辑的
      fetch(serverUrl+'/share/editArticle',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;chatset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'addArticle',
          title: articleTitle,
          text: editorText
        }),
        // 加上才能携带cookie
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        switch(res.status) {
          case 'success':
            let articleId = res.insertId;
            that.props.articleSubOk(articleId);
            break;
          case 'fail':
            alert(res.msg);
            break;
          case 'overdue':
            // 登录失效
            if(confirm(res.msg)){
              window.localStorage.removeItem('email');
              // 刷新页面
              window.location.reload();
            }
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
      this.setState({
        articleText: editorText
      });
    }else {
      // 重新编辑的
      console.log('重新编辑');
      fetch(serverUrl+'/share/reEditArticle',{
        method: 'post',
        mode: 'cors',
        headers: {
          'Accept': 'application/json;chatset=utf-8',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          act: 'reEditArticle',
          articleId: articleId,
          title: this.state.title,
          text: this.state.articleText
        }),
        // 加上才能携带cookie
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        switch(res.status) {
          case 'success':
            that.props.articleSubOk(articleId);
            break;
          case 'fail':
            alert(res.msg);
            break;
          case 'overdue':
           // 登录失效
            if(confirm(res.msg)){
              window.localStorage.removeItem('email');
              // 刷新页面
              window.location.reload();
            } 
            break;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  componentDidMount(){
/********************************************************************/ 
    const ele = this.refs.editorEle;
    const editor = new Editor(ele);
    this.setState({
      editor: editor
    });
    editor.customConfig.onchange = html => {
      this.setState({
        articleText: html
      })
    }
    // 改变富文本编辑器的z-index
    editor.customConfig.zIndex = 10;
    // （下列配置可显示‘上传图片’）使用base64保存图片
    editor.customConfig.uploadImgShowBase64 = true;
    // 关闭粘贴样式的过滤
    editor.customConfig.pasteFilterStyle = false
    // 设置内容
    editor.create();
/********************************************************************/ 
    // 重新编辑操作
    let options = {};
    // type  id
    if(window.location.search){
      let searchStr = window.location.search.split('?')[1];
      options=Option(searchStr);
      console.log('options:',options);
      if(options.type==="article"){
        // 拉数据
        fetch(serverUrl+'/share/getArticle?articleId='+options.id,{
          method: 'get',
          mode: 'cors',
          // 加上才能携带cookie
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status==='success'){
            this.setState({
              articleId: options.id,
              title: res.data.title
            })
            this.state.editor.txt.html(res.data.text);
          }else {
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
  render(){
    return (
      <div id="article" data-articleId={this.state.articleId}>
        <p className="title">
          <input type="text" name="articleTitle" value={this.state.title} placeholder="请输入标题" onChange={this.handleTitleInput}/>
        </p>
        <div id="richEdit" ref="editorEle" style={{ textAlign: 'left' }}>
        </div>
        <p><input type="submit" name="richEditSub" value="提交文章" onClick={this.handleArticleSub}/></p>
      </div>
    )
  }
}
class VideoEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: '',
      videoTitle: '',
      videoSrc: '',
      videoText: '',
      videoFile: ''
    };
    this.handleVideoInputChange = this.handleVideoInputChange.bind(this);
    this.handleVideoSub = this.handleVideoSub.bind(this);
  }
  handleVideoInputChange(e){
    let file = e.target.files[0];
    console.log(file); 
    // 文件阅读器
    let videoUrl = URL.createObjectURL(file);
    console.log(videoUrl);
    document.getElementById('videoPlayer').src=videoUrl;
    this.setState({
      videoFile: file
    });
  }
  handleVideoSub(){
    let uploadData = new FormData();
    let videoId = document.getElementById('video').dataset.videoid;
    let that = this;
    console.log('title',this.videoTitleInput.value);
    console.log('video',this.state.videoFile);
    console.log('text',this.videoTextInput.value);
    if(this.videoTitleInput.value&&this.state.videoFile){
      if(!videoId){
        // 新编辑的
        uploadData.append('videoTitle', this.videoTitleInput.value);
        uploadData.append('video', this.state.videoFile);
        uploadData.append('videoText', this.videoTextInput.value);
        fetch(serverUrl+'/share/editVideo',{
          method: 'post',
          mode: 'cors',
          // 不设置Content-type，否则出现Boundary
          // headers: {
          //   'Content-Type': 'multipart/form-data;boundary=ABCD'
          // },
          body: uploadData,
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          let videoId = res.insertId;
          switch(res.status){
            case 'success':
              that.props.videoSubOk(videoId);
              break;
            case 'fail':
              alert(res.msg);
              break;
            case 'overdue':
              if(confirm(res.msg)){
                window.localStorage.removeItem('email');
                // 刷新页面
                window.location.reload();
              }
              // 登录失效
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }else{
        // 重新编辑的
        uploadData.append('videoId',videoId);
        uploadData.append('videoTitle', this.videoTitleInput.value);
        uploadData.append('videoText', this.videoTextInput.value);
        fetch(serverUrl+'/share/reEditVideo',{
          method: 'post',
          mode: 'cors',
          // 不设置Content-type，否则出现Boundary
          // headers: {
          //   'Content-Type': 'multipart/form-data;boundary=ABCD'
          // },
          body: uploadData,
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          switch(res.status){
            case 'success':
              that.props.videoSubOk(videoId);
              break;
            case 'fail':
              alert(res.msg);
              break;
            case 'overdue':
              if(confirm(res.msg)){
                window.localStorage.removeItem('email');
                // 刷新页面
                window.location.reload();
              }
              // 登录失效
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }else {
      alert('请填写标题并上传视频');
    }
  }
  componentDidMount(){
    let options = {};
    if(window.location.search){
      let searchStr = window.location.search.split('?')[1];
      options=Option(searchStr);
      console.log('options:',options);
      if(options.type==="video"){
        // 拉数据
        fetch(serverUrl+'/share/getVideo?videoId='+options.id,{
          method: 'get',
          mode: 'cors',
          // 加上才能携带cookie
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status==='success'){
            this.setState({
              videoId: options.id,
              videoTitle: res.data.title,
              videoSrc: serverUrl+''+res.data.videoUrl,
              videoText: res.data.text,
              videoFile: 'be placed by src'
            })
            document.querySelector('.videoText').value=res.data.text;
          }else {
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
  render() {
    return (
      <div id="video" data-videoId={this.state.videoId}>
        <form method="post" enctype="multipart/form-data" onSubmit={e => e.preventDefault()}>
          <p className="title">
            <input type="text" name="videoTitle" placeholder="请输入标题"
              ref={input => this.videoTitleInput = input}
              defaultValue={this.state.videoTitle}
            />
          </p>
          <div className="drag">
            {!this.state.videoId?
              <div className="add-video-btn">
                <input type="file" name="videoFile" accept="video/*" 
                  onChange={this.handleVideoInputChange}
                />
              </div>
              :
              <p style={{textAlign: "left", fontSize: "12px",color: "#ccc"}}>已上传的音频不能编辑</p>
            }
            <video id="videoPlayer" controls="controls" preload src={this.state.videoSrc}>
            </video>
          </div>
          <p>
            <textarea 
              placeholder="添加视频描述"
              ref={input => this.videoTextInput = input}
              className="videoText"
            ></textarea>
          </p>
          <p><input type="submit" name="videoSub" value="提交视频" onClick={this.handleVideoSub}/></p>
        </form>
      </div>
    )
  }
}
class AudioEditor extends Component {
  constructor(props){
    super(props);
    this.state = {
      // 录音对象
      recorder: '',
      // 录音文件
      audioFile: '',
      // 音频类型
      audioType: 'file',
      /*以下用来重新编辑*/ 
      audioId: '',
      audioTitle: '',
      audioSrc: '',
      audioText: '',
      // audioType: 'record'
    };
    this.handleAudioInputChange = this.handleAudioInputChange.bind(this);
    this.handleRecorder = this.handleRecorder.bind(this);
    this.handleAudioSub = this.handleAudioSub.bind(this);
    this.blobToDataBase64 = this.blobToDataBase64.bind(this);
  }
  handleAudioInputChange(e){
    let file = e.target.files[0];
    console.log(file);
    let audioUrl = URL.createObjectURL(file);
    console.log(audioUrl);
    document.getElementById('audioPlayer').src=audioUrl;
    this.setState({
      audioFile: file,
      audioType: 'file'
    })
  }
  handleRecorder(e){
    // Recorder
    let target = e.target;
    let Oaudio = document.getElementById('audioPlayer');
    let that = this;
    switch(target.className){
      case 'record-start':
        Recorder.get(rec => {
          rec.start();
          this.setState({
            recorder: rec,
            audioType: 'record'
          })
        })
        break;
      case 'record-stop':
        this.state.recorder.stop();
        this.blobToDataBase64(this.state.recorder.getBlob(), res => {
          let voiceData = res.split(',')[1];
          that.setState({
            audioFile: voiceData
          })
        })
        break;
      case 'record-play':
        this.state.recorder.play(Oaudio);
        break;
    }
  }
  handleAudioSub(){
    let uploadData = new FormData();
    let that = this;
    let audioTitle = this.audioTitleInput.value;
    let audioText = this.audioTextInput.value;
    let audioId = document.getElementById('audio').dataset.audioid;
    console.log('title:',audioTitle);
    console.log('audio:',this.state.audioFile);
    console.log('audioType',this.state.audioType);
    console.log('text:',audioText);
    if(audioTitle&&this.state.audioFile){
      if(!audioId){
        // 新编辑的
        uploadData.append('audioTitle',audioTitle);
        uploadData.append('audio',this.state.audioFile);
        uploadData.append('audioText',audioText);
        uploadData.append('audioType',this.state.audioType);
        fetch(serverUrl+'/share/editAudio',{
          method: 'post',
          mode: 'cors',
          body: uploadData,
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          let audioId = res.insertId;
          switch(res.status){
            case 'success':
              that.props.audioSubOk(audioId);
              break;
            case 'fail':
              alert(res.msg);
              break;
            case 'overdue':
              if(confirm(res.msg)){
                window.localStorage.removeItem('email');
                // 刷新页面
                window.location.reload();
              }
              // 登录失效
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }else{
        // 重新编辑的
        uploadData.append('audioId',audioId);
        uploadData.append('audioTitle',audioTitle);
        uploadData.append('audioText',audioText);
        fetch(serverUrl+'/share/reEditAudio',{
          method: 'post',
          mode: 'cors',
          body: uploadData,
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          switch(res.status){
            case 'success':
              that.props.audioSubOk(audioId);
              break;
            case 'fail':
              alert(res.msg);
              break;
            case 'overdue':
              if(confirm(res.msg)){
                window.localStorage.removeItem('email');
                // 刷新页面
                window.location.reload();
              }
              // 登录失效
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }else {
      alert('请填写标题并提供音频');
    }
  }
  componentDidMount(){
    let options = {};
    if(window.location.search){
      let searchStr = window.location.search.split('?')[1];
      options=Option(searchStr);
      console.log('options:',options);
      if(options.type==="audio"){
        // 拉数据
        fetch(serverUrl+'/share/getAudio?audioId='+options.id,{
          method: 'get',
          mode: 'cors',
          // 加上才能携带cookie
          credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if(res.status==='success'){
            this.setState({
              audioId: options.id,
              audioTitle: res.data.title,
              audioSrc: serverUrl+''+res.data.audioUrl,
              audioText: res.data.text,
              audioFile: 'be placed by src'
            })
            document.querySelector('.audioText').value=res.data.text;
          }else {
            alert(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  }
  // 将blob文件转换为base64格式
  blobToDataBase64(blob,callback){
    let reader = new FileReader();
    reader.onload = e => {
      callback&&callback(e.target.result);
    }
    reader.readAsDataURL(blob);
  }
  render(){
    return (
      <div id="audio" data-audioId={this.state.audioId}>
        <form method="post" enctype="multipart/form-data" onSubmit={e => e.preventDefault()}>
          <p className="title">
            <input type="text" name="audioTitle" placeholder="请输入标题" 
              ref={input => this.audioTitleInput=input}
              defaultValue={this.state.audioTitle}
            />
          </p>
          <div className="drag">
            {
              !this.state.audioId?
              <React.Fragment>
                <p style={{textAlign: "left", fontSize: "12px",color: "#ccc"}}>可上传音频文件或录音</p>
                <div className="add-video-btn">
                  <input type="file" name="videoFile" accept="audio/*" 
                    onChange={this.handleAudioInputChange}
                  />
                </div>
                <div className="record" onClick={this.handleRecorder}>
                  <button className="record-start">录音</button>
                  <button className="record-stop">停止</button>
                  <button className="record-play">播放</button>
                  <a href="" click="" download="" id="downloadRec">下载</a>
                </div>
              </React.Fragment>
              :
              <p style={{textAlign: "left", fontSize: "12px",color: "#ccc"}}>已上传的音频不能编辑</p>
            }
            <audio controls="controls" src={this.state.audioSrc} id="audioPlayer">
            </audio>
          </div>
          <p>
            <textarea placeholder="添加音频描述"
              ref={input => this.audioTextInput=input}
              className='audioText'
            ></textarea>
          </p>
          <p><input type="submit" name="audioSub" value="提交音频" onClick={this.handleAudioSub}/></p>
        </form>
      </div>
    );
  }
}
class EditChooseRender extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      
    };
  }
  render() {
    switch (this.props.format) {
      case 'article':
        return(
          <ArticleEditor 
            articleSubOk={this.props.articleSubOk}
          />
        )
        break;
      case 'video':
        return (
          <VideoEditor 
            videoSubOk={this.props.videoSubOk}
          />
        )
        break;
      case 'audio':
        return (
          <AudioEditor 
            audioSubOk={this.props.audioSubOk}
          />
        )
        break;
    }
  }
}
class SubOkView extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    let checkLink = this.props.checkLink;
    let reEditLink = this.props.reEditLink;
    return(
      <div id="subOk">
        <div>
          <i className="iconfont icon-xuanzhong_"></i>
          <p>提交成功</p>
        </div>
        <div>
          <a href={reEditLink} target="_blank"><button>重新编辑</button></a>
          <a href={checkLink} target="_blank"><button>查看</button></a>
        </div>
      </div>
    )
  }
}
ReactDOM.render(
  <Edit />,
  document.getElementById('root')
);