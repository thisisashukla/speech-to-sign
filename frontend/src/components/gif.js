import React, { Component } from 'react';
import ImageStore from '../store/gifStore';
import * as ImgAction from '../actions/gifActions';
import styled from 'styled-components';

const Image = styled.img`
width: 100px;
height: 100px;
`
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
    console.log(gif)
    return (
      <div align="center">
      <Image src={gif}/>
      </div>
    );
  }
}

export default Gif;
