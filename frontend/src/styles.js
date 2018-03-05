import styled from 'styled-components';
import Button from 'material-ui/Button';
import { injectGlobal } from 'styled-components';
import Mosk from '../assests/fonts/mosk/Mosk_Medium_500.ttf';
import Bebas from '../assests/fonts/bebas/BebasNeue_Bold.ttf';

injectGlobal`
  @font-face {
    font-family: 'Mosk';
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
  width: 702px;
  height: 309.6px;
  margin-left: auto;
  margin-righ: auto;
`
const Image = styled.img `
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-righ: auto;
`
const PushButton = styled(Button)`
  background: white;
  color: white;
  radius: 50%;
`
const Text = styled.p `
  color: black;
  font-size:30px;
  text-align: center;
`

export {Title}
export {Image}
export {PushButton}
export {Text}
export {Heading}
