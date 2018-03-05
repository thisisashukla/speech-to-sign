import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class TextStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.transcript = 'SpeechToSign';
    this.src_lang = 'en';
    this.trgt_lang = 'en';
  }

  setDefault() {
    this.transcript = 'SpeechToSign';
    this.emit("change")
  }

  updateText(text) {
    console.log("updating text");
    this.transcript = text;
    this.emit("change");
  }

  getText() {
    return this.transcript;
  }

  handleActions(action) {}
}

const textStore = new TextStore;

dispatcher.register(textStore.handleActions.bind(textStore))
export default textStore;
