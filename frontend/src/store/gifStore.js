import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import images from '../images';
import * as apiCaller from '../apiCaller';
import LanguageStore from '../store/languageStore';

class GifStore extends EventEmitter {
  constructor(props) {
    super(props);
    // let img=require('../../assests/images/sign.gif');
    this.gif = images.defaultGif;
  }

  getDefault() {
    return images.defaultGif;
  }

  setDefault() {
    console.log("default called");
    this.gif = images.defaultGif;
    this.emit("change");
  }

  updateGif(newGif) {
    console.log("udpate called", newGif)
    this.gif = newGif;
    this.emit("change");
  }

  getGif() {
    console.log("getting gif")
    return this.gif;
  }

  handleActions(action) {
    switch (action.type) {
      case 'DEFAULT_GIF':
        {
          console.log("Default case")
          this.setDefault();
          break;
        };
      case 'TO_GIF':
        {
          var {src_lang, trgt_lang} = LanguageStore.getLanguage();
          console.log(src_lang,trgt_lang);
          apiCaller.backendRequest('api/' + this.src_lang + '/' + this.trgt_lang, (response) => {}, (error) => {})
          break;
        }
      }
    }
  }

const gifStore = new GifStore;

dispatcher.register(gifStore.handleActions.bind(gifStore))
// window.store=gifStore;
// window.dispatcher=dispatcher;
export default gifStore;
