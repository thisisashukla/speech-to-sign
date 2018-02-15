import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Gif from './components/gif';
// import Title from './components/title'

const Title= styled.h1`
  color: black;
  font-size:30px
`
class Layout extends Component {
  render(){
    // console.log(this.props.children);
    return (
      <div>
        <Gif/>
      </div>
    );
  }
}


ReactDOM.render(<Layout />, document.getElementById('root'));
