import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/test.css';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import Chat from './js/components/index/chat.js';

class Test extends Component {
  render() {
    return (
      <div>
        <Chat />
      </div>
    )
  }
}
ReactDOM.render(<Test />, document.getElementById('root'));