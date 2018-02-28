import styled from 'styled-components';
import Button from 'material-ui/Button';

const Title = styled.h1 `
  color: black;
  font-size:30px;
  text-align: center;
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
