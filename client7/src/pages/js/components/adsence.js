import React, { Component } from 'react';

class Adsence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        adsenceId: {
          overflow: "hidden",
          width: "100%",
          borderRadius: "2%",
          marginBottom: "10px",
          boxShadow: "0 0 15px #ccc",
          fontSize:"12px",
          cursor: "pointer",
        },
        h3: {
          height: "60px",
          fontSize: "14px",
          fontWeight: "normal",
          backgroundColor: "#ccc",
          color: "#fff",
          textAlign: "center",
          lineHeight: "26px"
        }
      }
    }
  }
  render() {
    return (
      <div id="adsence" style={this.state.style.adsenceId}>
        <h3 style={this.state.style.h3}>广告位待招，啦啦啦啦
          <p>adsence reception</p>
        </h3>
        <p style={{fontSize: "14px",height: "100px",backgroundColor:"#fff"}}></p>
      </div>
    );
  }
}
export default Adsence;