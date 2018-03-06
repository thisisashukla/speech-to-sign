import styled from 'styled-components';
import Button from 'material-ui/Button';
import { injectGlobal } from 'styled-components';
import Bebas from '../assests/fonts/bebas/BebasNeue_Bold.ttf';

injectGlobal`
  @font-face {
    font-family: 'Bebas';
    src: url(${Bebas});
  }
`
const heading = styled.h1`
  font-family: Bebas;
`

const Title = styled.h1 `
  color: black;
  font-size:30px;
  text-align: center;
  font-family: Bebas;
`

const Heading = styled.img`
  width: 585px;
  height: 258px;
  margin-left: auto;
  margin-righ: auto;
`
const Image = styled.img `
  width: 360px;
  height: 360px;
  display:inline-block;
  margin-left:150px;
`
const PushButton = styled.button`
  background: blue;
  color: white;
  display:inline-block;
  width: 100%;
  text-align: center;
  font-size: 25px;
  font-family: Mosk;
`
const Text = styled.p `
  color: black;
  font-size:30px;
  text-align: center;
  font-family: 'Fira Sans', sans-serif;
`
const Status = styled.p `
  color: red;
  font-size:20px;
  text-align: left;
  font-family: 'Fira Sans', sans-serif;
`

const FooterImage = styled.img`
  align: center;
  width: 127.68px;
  height: 61.92px;
  margin-left: auto;
  margin-righ: auto;
`

const Footer = styled.p`
  background: green;
  font:Mosk;
  font-size:15px;
  font-family: 'Fira Sans', sans-serif;
  color:white;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 0px;
  margin-bottom:0px;
`
const Tag = styled.p`
  background: white;
  font-size: 15px;
  font-family: 'Josefin Sans', sans-serif;
  color:black;
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: 0px;
  margin-bottom:5px;
`

const Message = styled.p`
  color:black;
  font-size:15px;
`
export {Title}
export {Image}
export {PushButton}
export {Text}
export {Status}
export {Heading}
export {FooterImage}
export {Footer}
export {Message}
export {Tag}
