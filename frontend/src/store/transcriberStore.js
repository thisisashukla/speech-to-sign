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
    // console.log('inside starteer',this.recognizer)
    this.recognizer.Recognize((event) => {
      /*
      Alternative syntax for typescript devs.
      if (event instanceof SDK.RecognitionTriggeredEvent)
      */
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
          console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechHypothesisEvent":
          this.transcript = event.Result.Text
          console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechFragmentEvent":
          this.transcript = event.Result.Text;
          this.append = true;
          console.log(JSON.stringify(event.Result)); // check console for other information in result
          this.emit("change");
          break;
        case "SpeechEndDetectedEvent":
          this.btnStatus = true;
          this.recognitionStatus = "Processing_Adding_Final_Touches";
          console.log(JSON.stringify(event.Result)); // check console for other information in result
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
          console.log(JSON.stringify(event)); // check console for other information in result
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
          // console.log("Starting recognition")
          this.SDK = action.payload['SDK'];
          this.recognizer = action.payload['recognizer'];
          // console.log(action.payload);
          // console.log('handling start recog action',this.SDK,this.recognizer);
          // console.log('this.recog',this.recognizer);
          this.recognizerStart()
          break;
        };
      case 'STOP_RECOGNITION':
        {
          // console.log("update case");
          this.SDK = action.payload['SDK'];
          this.recognizer = action.payload['recognizer'];
          // console.log('handling start recog action',this.SDK,this.recognizer);
          // console.log('this.recog',this.recognizer);
          this.recognizerStop();
          break;
        };
    }
  }
}

const transcriberStore = new TranscriberStore;

dispatcher.register(transcriberStore.handleActions.bind(transcriberStore))
// window.store=gifStore;
// window.dispatcher=dispatcher;
export default transcriberStore;
