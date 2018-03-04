import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class TranscriberStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.recognitionStatus = null;
    this.transcript = null;
    this.append = false;
    this.btnStatus = false;
    this.SDK = null;
    this.recognizer = null;
  }

  getResult() {
    return [this.recognitionStatus, this.transcript, this.append];
  }

  // Start the recognition
  recognizerStart = () => {
    this.recognizer.Recognize((event) => {
      switch (event.Name) {
        case "RecognitionTriggeredEvent":
          this.recognitionStatus = "Initializing";
          this.emit("change");
          break;
        case "ListeningStartedEvent":
          this.recognitionStatus = "Listening";
          this.emit("change");
          break;
        case "RecognitionStartedEvent":
          this.recognitionStatus = "Listening_Recognizing";
          this.emit("change");
          break;
        case "SpeechStartDetectedEvent":
          this.recognitionStatus = "Listening_DetectedSpeech_Recognizing";
          // console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechHypothesisEvent":
          this.transcript = event.Result.Text
          // console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechFragmentEvent":
          this.transcript = event.Result.Text;
          this.append = true;
          // console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechEndDetectedEvent":
          this.btnStatus = true;
          this.recognitionStatus = "Processing_Adding_Final_Touches";
          // console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechSimplePhraseEvent":
          this.transcript = event.Result;
          this.recognitionStatus = "Recognition Succeeded";
          this.emit("success");
          break;
        case "SpeechDetailedPhraseEvent":
          this.transcript = event.Result
          this.recognitionStatus = "Recognition Succeeded";
          this.emit("success");
          break;
        case "RecognitionEndedEvent":
          this.btnStatus = true;
          this.recognitionStatus = "Idle";
          // console.log(JSON.stringify(event)); // check console for other information in result
          break;
        default:
          console.log(JSON.stringify(event)); // Debug information
      }
    }).On(() => {
      // The request succeeded. Nothing to do here.
    }, (error) => {
      console.error(error);
    });
  }

  recognizerStop = () => {
    this.recogizer.AudioSource.TurnOff();
  }

  handleActions(action) {
    switch (action.type) {
      case 'START_RECOGNITION':
        {
          this.SDK = action.payload['SDK'];
          this.recognizer = action.payload['recognizer'];
          this.recognizerStart()
          break;
        };
      case 'STOP_RECOGNITION':
        {
          this.SDK = action.payload['SDK'];
          this.recognizer = action.payload['recognizer'];
          this.recognizerStop();
          break;
        };
    }
  }
}

const transcriberStore = new TranscriberStore;

dispatcher.register(transcriberStore.handleActions.bind(transcriberStore))
export default transcriberStore;
