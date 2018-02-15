import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
class ImageStore extends EventEmitter {
  constructor() {
    super();
    this.gif='F:\sign\book.gif';
  }

  updateImageStore(gif) {
    this.gif=gif;
    this.emit("change");
  }

  getDefault() {
    return 'F:\sign\book.gif';
  }

  getGif() {
    return this.gif;
  }

  handleActions(action) {
    console.log('action handled');
  }

}


const imgStore = new ImageStore;

dispatcher.register(imgStore.handleActions.bind(this))

window.dispatcher=dispatcher;
export default imgStore;
