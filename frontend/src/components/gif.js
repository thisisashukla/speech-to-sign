import React, { Component } from 'react';
import ImageStore from '../store/ImageStore'
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

  render() {
    const { gif } = this.state;

    return (
      <div>
        <a>{gif}</a>
      </div>
    );
  }
}

export default Gif;
