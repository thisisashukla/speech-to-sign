import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import {apiCaller} from '../apiCaller';

class TextStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.text = 'SpeechToSign';
    this.src_lang = 'en';
    this.trgt_lang = 'en';
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
    switch (action.type) {
      case 'ANALYSE_TEXT':
        {
          apiCaller.backendRequest('api/' + this.src_lang + '/' + this.trgt_lang, (response) => {}, (error) => {})
          break;
        }
    }
  }
}

const textStore = new TextStore;

dispatcher.register(textStore.handleActions.bind(textStore))
export default textStore;
