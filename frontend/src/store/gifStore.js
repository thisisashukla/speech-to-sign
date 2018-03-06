import images from '../images';
import {EventEmitter} from 'events';
import dispatcher from '../dispatcher';
import LanguageStore from '../store/languageStore';

var imageCount=0;

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

  urlReceived(gifArr) {
    // console.log('urlreceived');
    this.gifs = gifArr;
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
          // this.urlReceived(action.payload.gif_array);
          // var no=action.payload.gif_array.length;
          // console.log('chanign gif', no )
          // console.log(action.payload.gif_array[i])
          // setTimeout(this.updateGif(action.payload.gif_array[(imageCount+1) % (no+1)]), 1000);
          var len=action.payload.gif_array.length;
          var i=0;
          setInterval(
            () => {
              // console.log(i);
              this.updateGif(action.payload.gif_array[i]);
              i=i+1;
              if(i==len){
                i=0;
              }
            }
            , 2500);
          break;
        }
    }
  }
}

const gifStore = new GifStore;

dispatcher.register(gifStore.handleActions.bind(gifStore))
export default gifStore;
