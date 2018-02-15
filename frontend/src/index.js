import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Title from './components/title';


class Heading extends Component {
  render() {
    return (
      <div>
        <div>
          <Title>SpeechToSign</Title>
        </div>
        <div>
          <Gif></Gif>
        </div>
        <div>
          <Text></Text>
        </div>
        <div>
          <Button></Button>
        </div>
      </div>          
    );
  }
}

var root = document.getElementById('root');

ReactDOM.render(<Heading />, root);
