import React, { Component } from 'react';
import TranscriberStore from '../store/transcriberStore';
// import ImageStore from '../store/gifStore';
// import * as ImgAction from '../actions/gifActions';
import { Text } from '../styles';

class Transcription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      transcript: null,
    };
  }

  componentWillMount() {
    TranscriberStore.on("change", () => {
      var [ status, text, append ] = TranscriberStore.getResult();
      if(append)
        text=this.state.transcript+text;
      this.setState({
        status: status,
        text: text,
      })
    })
  }

  render() {
    return (
      <div>
        <Text>{this.state.status}</Text>
        <Text>{this.state.text}</Text>
      </div>
    );
  }
}

export default Transcription;
