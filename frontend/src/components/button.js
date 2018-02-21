import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import * as BtnAction from '../actions/buttonActions';
import ButtonStore from '../store/buttonStore';

class Button extends Component {
  constructor(props) {
    super(props);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.state = {
      record: false
    }

  }

  componentWillMount() {
    ButtonStore.on("change", () => {
      this.setState({
        record: ButtonStore.getStatus(),
      })
    })
  }

  startRecording = () => {
    BtnAction.startRecording();
  }

  stopRecording = () => {
    BtnAction.stopRecording();
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
