import {Title} from './styles';
import ReactDOM from 'react-dom';
import Gif from './components/gif';
import React, {Component} from 'react';
import Language from './components/language';
import Transcription from './components/text';
import Transcriber from './components/transcriber';

class Heading extends Component {
  render() {
    return (
      <div>
        <div>
          <Title>SpeechToSign</Title>
        </div>
        <div align="center">
          <Gif/>
        </div>
        <div align="center">
          <Transcriber/>
        </div>
        <div align="center">
          <Language/>
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
  <Heading/>, root);
