import images from './images';
import ReactDOM from 'react-dom';
import Gif from './components/gif';
import React, {Component} from 'react';
import {Heading, FooterImage, Footer, Message, Tag} from './styles';
import Language from './components/language';
import Transcription from './components/text';
import Transcriber from './components/transcriber';

class App extends Component {
  render() {
    return (
      <div>
      <div align="center" >
        <Heading src={images.headingPng}/>
      </div>
      <table align="center">
        <tbody>
          <tr>
            <td>
              <div>
                <Transcriber/>
              </div>
              <div>
                <Transcription/>
              </div>
            </td>
            <td height="360px" width="360px"><Gif/></td>
          </tr>
        </tbody>
      </table>
        <div align="center" padding-top="50px">
          <Tag>Made with ❤ at <a href="http://www.csre.iitb.ac.in/"><FooterImage src={images.csreLogo}/></a> by <a href="https://daas-ankur-shukla.github.io/" style={{ textDecoration: 'none' }}>Ankur</a><a>, Bodhisattwa & Jayesh</a></Tag>
        </div>
        <div align="center" padding-bottom="10px">
          <Footer>We thank <a href="http://lifeprint.com/asl101/pages-layout/faculty.htm" style={{ textDecoration: 'none' }}>Dr. Bill Vicars</a> for his support in the development of this application</Footer>
        </div>
      </div>
    );
  }
}

var root = document.getElementById('root');

ReactDOM.render(<App/>, root);
