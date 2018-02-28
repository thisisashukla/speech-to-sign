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
      transcript: 'Your Text Appears here',
    };
  }

  componentWillMount() {
    TranscriberStore.on("change", () => {
      var [ status, text, append ] = TranscriberStore.getResult();
      console.log('transcript',text, append)
      if(append)
        text=this.state.transcript+text;
      this.setState({
        status: status,
        text: text,
      })
    })

    TranscriberStore.on("success", () => {
      var [ status, result, append ] = TranscriberStore.getResult();
      // console.log(typeof result);
      var { RecognitionStatus, DisplayText, Offset, Duration } = result;
      // console.log(RecognitionStatus, DisplayText, Offset, Duration)
      // console.log("success", result, result.Offset)
      this.setState({
        status: status,
        text: DisplayText,
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