import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import images from '../images';

class GifStore extends EventEmitter {
  constructor() {
    super();
    // let img=require('../../assests/images/sign.gif');
    this.gif=images.defaultGif;
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
    console.log("udpate called",newGif)
    this.gif=newGif;
    this.emit("change");
  }

  getGif() {
    console.log("getting gif")
    return this.gif;
  }

  handleActions(action) {
    switch(action.type) {
      case 'DEFAULT_GIF': {
        console.log("Default case")
        this.setDefault();
        break;
      };
      case 'UPDATE_GIF': {
        console.log("update case")
        this.updateGif(action.payload);
        break;
      };
    }
  }
}


const gifStore = new GifStore;

dispatcher.register(gifStore.handleActions.bind(gifStore))
window.store=gifStore;
window.dispatcher=dispatcher;
export default gifStore;
