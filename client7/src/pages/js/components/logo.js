import React, { Component } from 'react';

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoStyle: {
        position: "fixed",
        top: "10px",
        left: "10px",
        borderBottom: "2px solid rgb(152,203,43)",
        color: "rgb(0,113,46)",
        fontSize: "18px",
        cursor: "pointer"
      }
    }
  }
  render() {
    return (
      <h2 id="logo" style={this.state.logoStyle}>healthy <span style={{ color: "rgb(152,203,43)" }}>diet</span></h2>
    );
  }
}
export default Logo;