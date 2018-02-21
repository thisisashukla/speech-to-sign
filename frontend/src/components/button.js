import React, { Component } from 'react';

import { ReactMic } from 'react-mic';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }

  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return (
      <div>
        <div>
            <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
        </div>
        <div>
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        </div>
      </div>
    );
  }
}

export default Button;
