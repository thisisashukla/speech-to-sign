import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';


class ButtonStore extends EventEmitter {
  constructor(props) {
    super(props);
    this.record = false;
    }

  stopRecording() {
    console.log("default called");
    this.record = false;
    this.emit("change");
  }

  startRecording() {
    console.log("starting recording");
    this.record = true;
    this.emit("change");
  }

  getStatus() {
    return this.record;
  }

  handleActions(action) {
    switch(action.type) {
      case 'START_RECORDING': {
        console.log("Starting recording")
        this.startRecording();
        break;
      };
      case 'STOP_RECORDING': {
        console.log("update case")
        this.stopRecording();
        break;
      };
    }
  }
}


const buttonStore = new ButtonStore;

dispatcher.register(buttonStore.handleActions.bind(buttonStore))
// window.store=gifStore;
// window.dispatcher=dispatcher;
export default buttonStore;
