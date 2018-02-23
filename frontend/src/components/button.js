import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import * as BtnAction from '../actions/buttonActions';
import ButtonStore from '../store/buttonStore';
import { PushButton } from '../styles';
import MButton from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

class Button extends Component {
  constructor(props) {
    super(props);
    this.toggleRecording = this.toggleRecording.bind(this);
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

  toggleRecording = () => {
    if(this.state.record) {
      BtnAction.stopRecording();
    }
    else {
      BtnAction.startRecording();
    }
    this.state.record = !this.state.record;
    }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
    BtnAction.sttApiCall(recordedBlob);
  }

  render() {
    return (
      <div>
        <PushButton onClick={this.toggleRecording} type="button">
            <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#000000"
            backgroundColor="#FFFFFF"
            mimeType="audio/wav"
            audioBitsPerSecond={16000} />
        </PushButton>

      </div>
    );
  }
}

export default Button;
