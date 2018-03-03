import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import images from '../images';
import * as apiCaller from '../apiCaller';
import LanguageStore from '../store/languageStore';
import axios from 'axios';
import qs from 'querystring';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var BASE_BACKEND_URL = 'http://localhost:8000/';

class GifStore extends EventEmitter {
  constructor(props) {
    super(props);
    // let img=require('../../assests/images/sign.gif');
    this.urlReceived = this.urlReceived.bind(this);
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
    this.gifs=response.data.gif_array;
    console.log(this.gifs);
    this.emit("gifs_received");
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
          console.log('sending ajax to backend',BASE_BACKEND_URL+'api/' + src_lang + '/' + trgt_lang);
          axios.post(BASE_BACKEND_URL+'api/' + src_lang + '/' + trgt_lang, qs.stringify({params: action.payload}))
          .then(function (response) {
            console.log(response);
            this.urlReceived(response);
          })
          .catch(function (error) {
            console.log('errordddd',error);
          });
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
