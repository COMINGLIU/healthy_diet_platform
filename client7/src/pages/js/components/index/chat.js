import React,{Component} from 'react';
import ServerUrl from '../../../js/modules/serverUrl.js';

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      chatInfo: [
        // {
        //   ask: 'skdnskn',
        //   audio: 'ss',
        //   answer: ''
        // }
      ]
    };
    this.handleAudio = this.handleAudio.bind(this);
  }
  handleAudio(e){
    let target = e.target;
    if(target.className==="iconfont icon-systemprompt_fill"){
      let topBox =target.parentNode.parentNode.parentNode.parentNode; 
      let nowTargetNum = topBox.dataset.index;
      document.getElementById('chatAudio').src='data:audio/wav;base64,'+this.state.chatInfo[nowTargetNum].audio;
      document.getElementById('chatAudio').autoplay=true;
    }
  }
  componentDidMount(){
    let that = this;
    document.addEventListener('keydown',(e) => {
      if(e.keyCode===13){
        if(this.chatInput.value){
          let chatAsk = this.chatInput.value;
          this.chatInput.value = "";
          console.log('发送',chatAsk);
          fetch(ServerUrl+'/service/chat?text='+chatAsk,{
            method: 'get',
            mode: 'cors',
          })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            let newChatInfo = that.state.chatInfo;
            if(res.status==="success"){
              newChatInfo.push({
                ask: chatAsk,
                audio: res.data,
                answer: res.answer
              })
              that.setState({
                chatInfo: newChatInfo,
              })
              document.getElementById('chatAudio').src='data:audio/wav;base64,'+res.data;
              document.getElementById('chatAudio').autoplay=true;
            }else {
              newChatInfo.push({
                ask: chatAsk,
                audio: '',
                answer: res.answer
              })
              that.setState({
                chatInfo: newChatInfo,
              })
            }
            document.querySelector('.chatInfo').scrollTop = document.querySelector('.chatInfo').scrollHeight;
          })
          .catch(err => {
            console.log(err);
          })
        }
      }
    })
  }
  render(){
    let chatInfoList = this.state.chatInfo.map((item,index) => 
      <li key={index} data-index={index}>
        <div>
          <p>{item.ask}</p>
          <p><i className="iconfont icon-user--fill"></i></p>
        </div>
        <div>
          <p><i className="iconfont icon-account-pin-circle-fill"></i></p>
          <p>
            {
              item.audio?
              <button>
                <i className="iconfont icon-systemprompt_fill"></i>
              </button>
              :null
            }
            {item.answer}
          </p>
        </div>
      </li>
    );
    return (
      <div id="chat">
        <h3>智能闲聊
          <p>Smart chatting</p>
        </h3>
        <div className="chat-box">
          <div className="chatInfo" onClick={this.handleAudio}>
            <div className="defaultAnswerBox">
              <p><i className="iconfont icon-account-pin-circle-fill"></i></p>
              <p>待机中</p>
            </div>
            <ul>{chatInfoList}</ul>
          </div>
          <div className="chat-input-box">
            <input type="text" name="text" placeholder="回车发送" 
              ref={input => this.chatInput=input}
            />
          </div>
        </div>
        <audio src='' id="chatAudio"></audio>
      </div>
    );
  }
}
export default Chat;