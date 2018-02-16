import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Title from './components/title';
import Gif from './components/gif';

class Heading extends Component {
  render() {
    return (
      <div>
        <div>
          <Title>SpeechToSign</Title>
        </div>
        <div>
          <Gif/>
        </div>

      </div>
    );
  }
}

var root = document.getElementById('root');

ReactDOM.render(<Heading />, root);
