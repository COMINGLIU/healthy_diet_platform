import React, { Component } from 'react';
import '../../css/commonCss/remark.css';
import serverUrl from '../../js/modules/serverUrl.js';

class Remark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginShow: false,
      remarkShow: false
    };
    this.handleShowRemark = this.handleShowRemark.bind(this);
    this.handleRemarkClick = this.handleRemarkClick.bind(this);
  }
  handleShowRemark(e){
    console.log('goto-remark');
    this.setState({
      remarkShow: true
    });
    if (this.props.loginY) {
      this.setState({
        loginShow: false
      });
    } else {
      this.setState({
        loginShow: true
      });
    }
  }
  handleRemarkClick(e){
    let target = e.target||e.srcElement;
    let that = this;
    switch(target.className){
      case 'sub-remark-btn':
      case 'sub-remark-num':
        let aimTarget = target.parentNode.parentNode.getElementsByClassName('reply')[0];
        if(parseInt(this.getStyle(aimTarget,"height"))===0){
          target.parentNode.parentNode.getElementsByClassName('reply')[0].style.cssText="height: auto;padding: 20px";
        }else {
          target.parentNode.parentNode.getElementsByClassName('reply')[0].style.cssText="height: 0;padding: 0";
        }
        break;
      case 'gotoLogin':
        this.props.handleGotoLogin();
        if(window.localStorage.email){
          this.setState({
            loginShow: true
          })
        }
        break;
      case 'reMarkSubmit':
        console.log('reMarkSubmit');
        console.log(this.remarkText.value);
        if(window.localStorage.email){
          let remarkText = this.remarkText.value
          if(remarkText){
            fetch(serverUrl+'/share/addShareRemark',{
              method: 'post',
              mode: 'cors',
              headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                act: 'addShareRemark',
                editrecordId: this.props.editrecordId,
                remarkText: remarkText,
                authorId: this.props.authorId,
                shareUrl: window.location.href,
                shareTitle: this.props.shareTitle
              }),
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              switch(res.status){
                case 'success':
                  // 编辑成功
                  console.log('评论成功');
                  that.setState({
                    remarkShow: false
                  });
                  that.props.addNewRemark({
                    editrecordId: that.props.editrecordId,
                    // 返回的insertId
                    remarkId: res.data.remarkId,
                    userId: window.localStorage.userId,
                    userName: window.localStorage.userName,
                    remarkText: remarkText,
                    // 返回的时间
                    remarkTime: '1分钟内',
                    reply: []
                  })
                  break;
                case 'fail':
                  alert(res.msg);
                  break;
                case 'overdue':
                  if(confirm(res.msg)){
                    that.props.handleGotoLogin();
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
          }else {
            alert('请先填写评论');
          }
        }else{
          // 登录
          if(confirm(res.msg)){
            that.props.handleGotoLogin();
          }
        }
        break;
      case 'replySubmit':
        console.log('replySubmit');
        let topRemarkBox = target.parentNode.parentNode.parentNode;
        console.log(topRemarkBox);
        let targetTextNum = topRemarkBox.dataset.remarkid;
        let beReplyedUserId = topRemarkBox.dataset.userid;
        let targetIndex = topRemarkBox.dataset.index;
        let replyTextArea = this['replyText'+targetTextNum];
        console.log(replyTextArea.value);
        if(window.localStorage.email){
          if(replyTextArea.value){
            fetch(serverUrl+'/share/addShareReply',{
              method: 'post',
              mode: 'cors',
              headers: {
                'Accept': 'application/json;charset=utf-8',
                'Content-type': 'application/json'
              },
              body: JSON.stringify({  
                act: 'addShareReply',
                remarkId: targetTextNum,
                beReplyedUserId: beReplyedUserId,
                replyText: replyTextArea.value,
                shareTitle: this.props.shareTitle,
                shareUrl: window.location.href
              }),
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              switch(res.status){
                case 'success':
                  console.log('评论成功');
                  that.props.addNewReply(targetIndex,{
                    remarkId: targetTextNum,
                    replyId: res.data.replyId,
                    userId: window.localStorage.userId,
                    beReplyedUserId: beReplyedUserId,
                    userName: window.localStorage.userName,
                    replyText: replyTextArea.value,
                    replyTime: '1分钟内'
                  })
                  replyTextArea.value='';
                  break;
                case 'fail':
                  alert(res.msg);
                  break;
                case 'overdue':
                  // 登录
                  if(confirm(res.msg)){
                    that.props.handleGotoLogin();
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
          }else {
            alert('请先填写评论');
          }
        }
        break;
      case 'iconfont icon-shanchu del-remark':
        console.log('删除评论');
        if(confirm('确定删除吗')){
          if(window.localStorage.email){
            let topRemarkLi = target.parentNode.parentNode;
            let remarkId = topRemarkLi.dataset.remarkid;
            let remarkIndex = topRemarkLi.dataset.index;
            let that = this;
            fetch(serverUrl+'/share/deleteRemark?remarkId='+remarkId,{
              method: 'get',
              mode: 'cors',
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              switch(res.status){
                case 'success':
                  that.props.delRemark({
                    remarkIndex: remarkIndex
                  })
                  break;
                case 'fail':
                  alert(res.msg);
                  break;
                case 'overdue':
                  if(confirm(res.msg)){
                    that.props.handleGotoLogin();
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
          }else {
            that.props.handleGotoLogin();
          }
        }
        break;
      case 'iconfont icon-shanchu del-reply':
        console.log('删除回复');
        if(confirm('确定删除吗')){
          if(window.localStorage.email){
            let topReplyLi = target.parentNode.parentNode;
            let replyId = topReplyLi.dataset.replyid;
            let remarkId = topReplyLi.dataset.remarkid;
            let remarkIndex = topReplyLi.dataset.remarkindex;
            let replyIndex = topReplyLi.dataset.replyindex;
            let that =this;
            fetch(serverUrl+'/share/deleteReply?replyId='+replyId,{
              method: 'get',
              mode: 'cors',
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              switch(res.status){
                case 'success':
                  that.props.delReply({
                    remarkIndex: remarkIndex,
                    replyIndex: replyIndex
                  });
                  break;
                case 'fail':
                  alert(res.msg);
                  break;
                case 'overdue':
                  if(confirm(res.msg)){
                    that.props.handleGotoLogin();
                  }
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            })
          }else {
            that.props.handleGotoLogin();
          }
        }
        break;
    }
  }
  getStyle(obj,attr){
    return getComputedStyle?getComputedStyle(obj)[attr]:obj.currentStyle[attr];
  }
  render() {
    let remarkListItem = null;
    if(this.props.remark){
      remarkListItem = this.props.remark.map((item,index) => {
        let replyListItem = item.reply?
          item.reply.map((repItem,ind) =>
            <li key={ind} 
              data-remarkId={repItem.remarkId} 
              data-replyId={repItem.replyId}
              data-userId={repItem.userId}
              data-beReplyedUserId={repItem.beReplyedUserId}
              data-remarkIndex={index}
              data-replyIndex={ind}
            >
              <p>{repItem.userName}</p>
              <p>{repItem.replyText}</p>
              <p>
                <span>{repItem.replyTime}</span>
                {
                  window.localStorage.userId===repItem.userId?
                  <i className="iconfont icon-shanchu del-reply"></i>
                  :null
                }
              </p>
            </li>
          )
          :null;
        return (
          <li key={item.remarkId} data-remarkId={item.remarkId} data-userId={item.userId} data-index={index}>
            <p>{item.userName}</p>
            <p>{item.remarkText}</p>
            <p>
              <span>{item.remarkTime}</span>
              <span className="sub-remark-btn"><i className="iconfont icon-Icon_edit"></i>评论</span>
              <span className="sub-remark-num">评论量({item.reply?item.reply.length:0})</span>
              {
                window.localStorage.userId===item.userId?
                <i className="iconfont icon-shanchu del-remark"></i>
                :null
              }
            </p>
            <div className="reply">
              <p>
                <textarea ref={text => this['replyText'+item.remarkId]=text}></textarea>
              </p>
              <p className="sub-p">
                <input type="submit" name="replySub" className="replySubmit"/>
              </p>
              <ul>{replyListItem}</ul>
            </div>
          </li>
        )
      });
    }
    let loginY = this.props.loginY;
    let remarkNum = this.props.remarkNum;
    return (
      <div id="remark" onClick={this.handleRemarkClick}>
        <div className="remark-btn">
          <span className="goto-remark" onClick={this.handleShowRemark}><i className="iconfont icon-Icon_edit"></i>评论</span>
          {
            window.localStorage.email ? null:<span className="gotoLogin">先登录</span>
          }
        </div>
        {
          this.state.remarkShow ?
            (
            <React.Fragment>
            <p className="remarkValue">
              <textarea ref={text=> this.remarkText=text}></textarea>
            </p>
            <p className="sub-p">
              <input type="submit" name="remarkSub" className="reMarkSubmit"/>
            </p>
            </React.Fragment>
            )
            : null
        }
        <ul>{remarkListItem}</ul>

      </div>
    );
  }
}

export default Remark;