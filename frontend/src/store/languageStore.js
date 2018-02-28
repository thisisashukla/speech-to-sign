import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';

class LanguageStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.src_lang = 'en';
    this.trgt_lang = 'en';
  }

  getDefault() {
    return {src_lang: 'en', trgt_lang: 'en'};
  }

  setDefault() {
    this.src_lang = 'en';
    this.trgt_lang = 'en';
    this.emit("change");
  }

  updateSrc(src_lang) {
    this.src_lang = src_lang;
    this.emit("change");
  }

  updateTrgt(trgt_lang) {
    this.trgt_lang = trgt_lang;
    this.emit("change");
  }

  getLanguage() {
    return {src_lang: this.src_lang, trgt_lang: this.trgt_lang};
  }

  handleActions(action) {
    switch (action.type) {
      case 'UPDATE_SRC':
        {
          this.updateSrc(action.payload);
          break;
        };
      case 'UPDATE_TRGT':
        {
          this.updateTrgt(action.payload);
          break;
        };
      }
    }
  }

const languageStore = new LanguageStore;

dispatcher.register(languageStore.handleActions.bind(languageStore))
export default languageStore;
