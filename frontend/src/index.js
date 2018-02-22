import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Title } from './styles';
import Gif from './components/gif';
import PushButton from './components/button';
import Transcription from './components/text';

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
          <PushButton/>
        </div>
        <div align="center">
          <Transcription/>
        </div>
      </div>
    );
  }
}

var root = document.getElementById('root');

ReactDOM.render(<Heading />, root);
