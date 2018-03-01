import React, {Component} from 'react';
import * as TrnscbrActions from '../actions/transcriberActions';
import {PushButton} from '../styles';
import * as SDK from 'microsoft-speech-browser-sdk';
import TranscriberStore from '../store/transcriberStore';
import {string, number, bool, func} from 'prop-types';
import { MS_SpeechKey } from '../subscriptionKeys';
class Transcriber extends Component {
  constructor(props) {
    super(props);
    this.toggleRecording = this.toggleRecording.bind(this);
    // this.toggleRecording = this.toggleRecording.bind(this);
    console.log('SETTING RECOGNIZER NULL');
    this.state = {
      subsKey: null,
      language: null,
      formatOptn: null,
      inptSrc: null,
      regMode: null,
      status: false,
      recognizer: null
    };
  }

  recognizerSetup = (recognitionMode, language, format, subscriptionKey) => {

    // console.log('setting up recognizer with',recognitionMode, language, format, subscriptionKey)

    switch (recognitionMode) {
      case "Interactive":
        recognitionMode = SDK.RecognitionMode.Interactive;
        break;
      case "Conversation":
        recognitionMode = SDK.RecognitionMode.Conversation;
        break;
      case "Dictation":
        recognitionMode = SDK.RecognitionMode.Dictation;
        break;
      default:
        recognitionMode = SDK.RecognitionMode.Interactive;
    }

    var recognizerConfig = new SDK.RecognizerConfig(new SDK.SpeechConfig(new SDK.Context(new SDK.OS(navigator.userAgent, "Browser", null), new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))), recognitionMode, language, // Supported languages are specific to each recognition mode. Refer to docs.
        format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

    // console.log('rec confog',recognizerConfig);

    var useTokenAuth = false;

    var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);

    // console.log('authenticate',authentication);
    // console.log(SDK.CreateRecognizer(recognizerConfig, authentication));

    return SDK.CreateRecognizer(recognizerConfig, authentication);
  }

  setup = (subsKey, language, formatOptn, inptSrc, regMode) => {
    if (this.state.recognizer != null) {
      TrnscbrActions.stop([SDK, this.state.recognizer]);
    }
    var outputFormat = null;
    // console.log('formats',SDK.SpeechResultFormat.Simple,SDK.SpeechResultFormat.Detailed);
    switch (formatOptn) {
      case "Simple":
        outputFormat = SDK.SpeechResultFormat.Simple;
        break;
      case "Detailed":
        outputFormat = SDK.SpeechResultFormat.Detailed;
        break;
    }

    // console.log('going to intialize reconizer with', subsKey, language, outputFormat, inptSrc, regMode);
    return this.recognizerSetup(regMode, language, outputFormat, subsKey);
    // console.log('recognizer set',this.recognizer);
  }

  componentWillMount() {
    const {subsKey, language, formatOptn, inptSrc, regMode} = this.props;
    this.setState({
      subsKey: subsKey,
      language: language,
      formatOptn: formatOptn,
      inptSrc: inptSrc,
      regMode: regMode,
      status: false,
      recognizer: this.setup(subsKey, language, formatOptn, inptSrc, regMode)
    })

  }

  toggleRecording = () => {
    // console.log('toggle',this.recognizer);
    if (this.state.status) {
      this.state.status=false;
      console.log(SDK,this.state.recogizer);
      TrnscbrActions.stop({'SDK': SDK, 'recognizer': this.state.recognizer});
    }

    else {
      this.state.status=true;
      // console.log('making starting recog call');
      // console.log('recognizer value',this.recognizer);
      TrnscbrActions.start({'SDK': SDK, 'recognizer': this.state.recognizer});
      console.log('after start',this.state.recognizer);
    }

  }

  render() {
    return (
      <div>
        <PushButton onClick={this.toggleRecording} type="button">Push</PushButton>
      </div>
    );
  }
}

Transcriber.propTypes = {
  subsKey: string,
  language: string,
  formatOptn: string,
  inptSrc: string,
  regMode: string,
  status: bool
};

Transcriber.defaultProps = {
  subsKey: MS_SpeechKey,
  language: 'en-US',
  formatOptn: 'Simple',
  inptSrc: 'Mic',
  regMode: 'Interactive',
  status: false
}

export default Transcriber;
