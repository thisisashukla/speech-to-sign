import images from './images';
import ReactDOM from 'react-dom';
import Gif from './components/gif';
import React, {Component} from 'react';
import {Heading} from './styles';
import Language from './components/language';
import Transcription from './components/text';
import Transcriber from './components/transcriber';

class App extends Component {
  render() {
    return (
      <div>
        <div align="center">
          <Heading src={images.headingPng}/>
        </div>
        <div align="center">
          <Gif/>
        </div>
        <div align="center">
          <Transcriber/>
        </div>
        <div align="center">
          <Transcription/>
        </div>
      </div>
    );
  }
}

var root = document.getElementById('root');

ReactDOM.render(
  <App/>, root);
