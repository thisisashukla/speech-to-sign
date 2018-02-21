import React, { Component } from 'react';
import TextStore from '../store/textStore';
// import ImageStore from '../store/gifStore';
// import * as ImgAction from '../actions/gifActions';
import { Text } from '../styles';

class Transcription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: TextStore.getText(),
    };
  }

  componentWillMount() {
    TextStore.on("change", () => {
      this.setState({
        text: TextStore.getText(),
      })
    })
  }

  render() {
    return (
      <Text>{this.state.text}</Text>
    );
  }
}

export default Transcription;
