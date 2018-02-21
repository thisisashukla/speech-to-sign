import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import * as SpeechToText from '../apicallers/speechToText';

class TextStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.text = 'SpeechToSign';
  }

  setDefault() {
    this.text = 'SpeechToSign';
    this.emit("change")
  }

  updateText(text) {
    console.log("updating text");
    this.text = text;
    this.emit("change");
  }

  getText() {
    return this.text;
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_RECORDING': {
        this.setDefault();
        break;
      }
      case 'STOP_RECORDING': {
        console.log("update case")
        this.updateText('nothing');
        break;
      };
      case 'SPEECH_TO_TEXT': {
        console.log('stt');
        text=SpeechToText.apiCall(action.payload);
        this.updateText(text);
      }
    }
  }
}


const textStore = new TextStore;

dispatcher.register(textStore.handleActions.bind(textStore))
// window.store=gifStore;
// window.dispatcher=dispatcher;
export default textStore;
