import {Text} from '../styles';
import {Status} from '../styles';
import React, {Component} from 'react';
import LanguageStore from '../store/languageStore';
import * as TxtActions from '../actions/textActions';
import TranscriberStore from '../store/transcriberStore';

class Transcription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      transcript: 'Click Button To Start Recognition'
    };
  }

  componentWillMount() {
    TranscriberStore.on("change", () => {
      var [status,
        text,
        append] = TranscriberStore.getResult();
      console.log('transcript', text, append)
      if (append)
        text = this.state.transcript + text;
      this.setState({status: status, transcript: text})
    })

    TranscriberStore.on("success", () => {
      var [status,
        result,
        append] = TranscriberStore.getResult();
      var {RecognitionStatus, DisplayText, Offset, Duration} = result;
      this.setState({status: status, transcript: DisplayText})
      TxtActions.toGif(DisplayText, LanguageStore.getLanguage());
    })
  }

  render() {
    return (
      <div>
        <Status>{this.state.status}</Status>
        <Text>{this.state.transcript}</Text>
      </div>
    );
  }
}

export default Transcription;
