import React, { Component } from 'react';
import ImageStore from '../store/gifStore';
import * as ImgAction from '../actions/gifActions';
import { Image } from '../styles';
import images from '../images';

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
    console.log("update action")
    var path=images.newGif;
    ImgAction.updateGif(path)
  }

  defaultGif() {
    console.log("defatul action")
    ImgAction.defaultGif()
  }

  render() {
    const { gif } = this.state;
    // console.log(gif)
    return (
      <div>
        <Image src={gif}/>
        <button onClick={this.updateGif.bind(this)}>Update</button>
        <button onClick={this.defaultGif.bind(this)}>Default</button>
      </div>
    );
  }
}

export default Gif;
