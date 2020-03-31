import React, { Component } from 'react';

class Face extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="face">
          <canvas className="canvas"></canvas>
          <video className="face-video"></video>
        </div>
        <p className="face-info">请将脸部对准摄像头</p>
      </React.Fragment>
    );
  }
}
export default Face;