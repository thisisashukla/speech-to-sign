import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';


class TranscriberStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.status=null;
    this.text=null;
    this.append=false;
    this.btnStatus=false;
    }

    getOutput = () => {
        return [this.status,this.text, this.btnActivate];
    }



      // Start the recognition
      recognizerStart = (SDK, recognizer) => {
          recognizer.Recognize((event) => {
              /*
               Alternative syntax for typescript devs.
               if (event instanceof SDK.RecognitionTriggeredEvent)
              */
              switch (event.Name) {
                  case "RecognitionTriggeredEvent" :
                      this.status="Initializing";
                      this.emit("change");
                      break;
                  case "ListeningStartedEvent" :
                      this.status="Listening";
                      this.emit("change");
                      break;
                  case "RecognitionStartedEvent" :
                      this.status="Listening_Recognizing";
                      this.emit("change");
                      break;
                  case "SpeechStartDetectedEvent" :
                      this.status="Listening_DetectedSpeech_Recognizing";
                      console.log(JSON.stringify(event.Result)); // check console for other information in result
                      this.emit("change");
                      break;
                  case "SpeechHypothesisEvent" :
                      this.text=event.Result.Text
                      console.log(JSON.stringify(event.Result)); // check console for other information in result
                      this.emit("change");
                      break;
                  case "SpeechFragmentEvent" :
                      this.text=event.Result.Text;
                      this.append=true;
                      console.log(JSON.stringify(event.Result)); // check console for other information in result
                      this.emit("change");
                      break;
                  case "SpeechEndDetectedEvent" :
                      this.btnStatus=true;
                      this.status="Processing_Adding_Final_Touches";
                      console.log(JSON.stringify(event.Result)); // check console for other information in result
                      this.emit("change");
                      break;
                  case "SpeechSimplePhraseEvent" :
                      this.text=JSON.stringify(event.Result, null, 3);
                      this.emit("change");
                      break;
                  case "SpeechDetailedPhraseEvent" :
                      this.text=JSON.stringify(event.Result, null, 3);
                      this.emit("change");
                      break;
                  case "RecognitionEndedEvent" :
                      this.btnStatus=true;
                      this.status="Idle";
                      console.log(JSON.stringify(event)); // check console for other information in result
                      break;
                  default:
                      console.log(JSON.stringify(event)); // Debug information
              }
          })
          .On(() => {
              // The request succeeded. Nothing to do here.
          },
          (error) => {
              console.error(error);
          });
      }

      recognizerStop = (SDK, recognizer) => {
        recogizer.AudioSource.TurnOff();
      }

  handleActions(action) {
    switch(action.type) {
      case 'START_RECOGNITION': {
        console.log("Starting recognition")
        const { SDK, recognizer } = action.payload;
        this.recognizerStart(SDK, recognizer)
        break;
      };
      case 'STOP_RECOGNITION': {
        console.log("update case");
        const { SDK, recognizer } = action.payload;
        this.recognizerStart(SDK, recognizer);
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
