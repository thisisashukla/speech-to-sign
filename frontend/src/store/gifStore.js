import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import images from '../../assests/images';

class GifStore extends EventEmitter {
  constructor() {
    super();
    this.gif=images.defaultGif;
  }

  getDefault() {
    return images.defaultGif;
  }

  updateGif(newGif) {
    this.gif=newGif;
    this.emit("change");
  }

  getGif() {
    return this.gif;
  }

  handleActions(action) {
    switch(action.type) {
      case 'DEFAULT_GIF': {
        this.getDefault();
      }
      case 'UPDATE_GIF': {
        this.updateGif(action.gif);
      }
    }
  }
}


const gifStore = new GifStore;

dispatcher.register(gifStore.handleActions.bind(gifStore))
window.store=gifStore;
window.dispatcher=dispatcher;
export default gifStore;
