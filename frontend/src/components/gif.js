import React, { Component } from 'react';
import ImageStore from '../store/gifStore';
import * as ImgAction from '../actions/gifActions';


class Gif extends Component {
  constructor() {
    super();
    this.state = {
      gif: ImageStore.getDefault(),
    };
  }

  componentWillMount() {
    ImageStore.on("change", () => {
      this.setState({
        gif: ImageStore.getGif(),
      })
    })
  }

  updateGif() {
    ImgAction.updateGif(Date.now())
  }

  render() {
    const { gif } = this.state;

    return (
      <div>
      <button onClick={this.updateGif.bind(this)}>Update</button>
        <a>{gif}</a>
      </div>
    );
  }
}

export default Gif;
