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
    this.gifs=null;
  }

  getDefault() {
    return images.defaultGif;
  }

  getGifArray(){
    return this.gifs;
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

  urlReceived(response) {
    console.log('urlreceived');
    this.gifs=response.gif_array;
    console.log(this.gifs);
    this.emit("gifs received");
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
          apiCaller.backendRequest('api/' + src_lang + '/' + trgt_lang, action.payload, this.urlReceived, (error) => {
            console.log('error calling backend')
          })
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
