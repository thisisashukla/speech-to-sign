import React, {Component} from 'react';
import ImageStore from '../store/gifStore';
import * as ImgAction from '../actions/gifActions';
import {Image} from '../styles';
import images from '../images';
import gifShot from 'gifshot';

class Gif extends Component {
  constructor(props) {
    super(props);
    this.updateGif = this.updateGif.bind(this);
    this.defaultGif = this.defaultGif.bind(this);
    this.state = {
      gif: ImageStore.getDefault()
    };
  }

  componentWillMount() {
    ImageStore.on("change", () => {
      this.setState({gif: ImageStore.getGif()})
    })

    ImageStore.on("gifs_received", () => {
      // this.setState({gif: this.trgt_gif})
      gifShot.createGIF({
        images: ImageStore.getGifArray(),
        interval: 1,
      }, (obj) => {
        if(!obj.error) {
          var img = obj.image;
          console.log(img);
          this.setState({gif: img});
        }
      });
    })
  }

  updateGif() {
    console.log("update action")
    var path = images.newGif;
    ImgAction.updateGif(path)
  }

  defaultGif() {
    console.log("default action")
    ImgAction.defaultGif()
  }

  render() {
    const {gif} = this.state;
    // console.log(gif)
    return (
      <div>
        <Image src={gif}/>
      </div>
    );
  }
}

export default Gif;
