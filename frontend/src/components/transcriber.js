import React, { Component } from 'react';
import * as RecAction from '../actions/recActions';
import { PushButton } from '../styles';
import * as SDK from 'microsoft-speech-browser-sdk';
import TranscriberStore from '../store/transcriberStore';

class Transcriber extends Component {
  constructor(props) {
    super(props);
    // this.toggleRecording = this.toggleRecording.bind(this);
    this.state = {
      subsKey: null,
      language: null,
      formatOptn: null,
      inptSrc: null,
      regMode: null,
    }
    var recognizer;
  }

  recognizerSetup(SDK, recognitionMode, language, format, subscriptionKey) {

    switch (recognitionMode) {
      case "Interactive" :
                  recognitionMode = SDK.RecognitionMode.Interactive;
                  break;
              case "Conversation" :
                  recognitionMode = SDK.RecognitionMode.Conversation;
                  break;
              case "Dictation" :
                  recognitionMode = SDK.RecognitionMode.Dictation;
                  break;
              default:
                  recognitionMode = SDK.RecognitionMode.Interactive;
          }

          var recognizerConfig = new SDK.RecognizerConfig(
              new SDK.SpeechConfig(
                  new SDK.Context(
                      new SDK.OS(navigator.userAgent, "Browser", null),
                      new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
              recognitionMode,
              language, // Supported languages are specific to each recognition mode. Refer to docs.
              format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)


          var useTokenAuth = false;

          var authentication = function() {
              if (!useTokenAuth)
                  return new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);

              var callback = function() {
                  var tokenDeferral = new SDK.Deferred();
                  try {
                      var xhr = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                      xhr.open('GET', '/token', 1);
                      xhr.onload = function () {
                          if (xhr.status === 200)  {
                              tokenDeferral.Resolve(xhr.responseText);
                          } else {
                              tokenDeferral.Reject('Issue token request failed.');
                          }
                      };
                      xhr.send();
                  } catch (e) {
                      window.console && console.log(e);
                      tokenDeferral.Reject(e.message);
                  }
                  return tokenDeferral.Promise();
              }

              return new SDK.CognitiveTokenAuthentication(callback, callback);
          }();

          return SDK.CreateRecognizer(recognizerConfig, authentication);
      }

    setup(subsKey, language, formatOptn, inptSrc, regMode) {
        if (recognizer != null) {
            RecAction.stop([SDK, recognizer]);
        }
        recognizer = recognizerSetup(regMode, language, SDK.SpeechResultFormat[formatOptn], subsKey);
      }



  componentWillMount() {
    const { subsKey, language, formatOptn, inptSrc, regMode } = this.props;
    this.setState({
      subsKey: subsKey,
      language: language,
      formatOptn: formatOptn,
      inptSrc: inptSrc,
      regMode: regMode,
      status: false,
    })

    recognizer = setup([subsKey, language, formatOptn, inptSrc, regMode])
  }

  toggleRecording = () => {
    if(status)
      RecAction.stop([SDK, recognizer]);
    else
      RecAction.start([SDK, recognizer]);
  }

  }

  render() {
    return (
      <div>
        <PushButton onClick={this.toggleRecording} type="button"
                      subsKey: subsKey
                      language: 'en-US'
                      formatOptn: formatOptn
                      inptSrc: inptSrc
                      regMode: regMode></PushButton>
      </div>
    );
  }
}

export default Transcriber;
