import images from '../images';
import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import LanguageStore from '../store/languageStore';

class GifStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.urlReceived = this.urlReceived.bind(this);
    this.gif = images.defaultGif;
    this.gifs = null;
  }

  getDefault() {
    return images.defaultGif;
  }

  setLoader() {
    this.gif = images.loaderGif;
    this.emit("change");
  }

  getGifArray() {
    return this.gifs;
  }

  setDefault() {
    // console.log("default called");
    this.gif = images.defaultGif;
    this.emit("change");
  }

  updateGif(newGif) {
    // console.log("udpate called", newGif)
    this.gif = newGif;
    this.emit("change");
  }

  getGif() {
    // console.log("getting gif")
    return this.gif;
  }

  urlReceived(data) {
    // console.log('urlreceived');
    this.gifs = data.gif_array;
    // console.log(this.gifs);
    this.emit("gifs_received");
  }

  handleActions(action) {
    switch (action.type) {
      case 'DEFAULT_GIF':
        {
          // console.log("Default case")
          this.setDefault();
          break;
        };
      case 'GETTING_GIF':
        {
          // console.log("setting loader");
          this.setLoader();
          break;
        }
      case 'GOT_GIF':
        {
          this.urlReceived(action.payload);
          break;
        }
    }
  }
}

const gifStore = new GifStore;

dispatcher.register(gifStore.handleActions.bind(gifStore))
export default gifStore;
