// import logo from '../img/tymphany-logo.png';
import { 
  Menu, 
  Container, 
  Image, 
} from 'semantic-ui-react'

function Header() {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={process.env.PUBLIC_URL+ '/img/tymphany-logo.png'} style={{ marginRight: '1.5em' }} />
          Tymphany Bidding Activity
          {/* 2020歲末 帶顆喇叭回家！ */}
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>
  );
}

export default Header;
