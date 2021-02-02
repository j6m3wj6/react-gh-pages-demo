import { 
  Menu, 
  Container, 
  Image, 
} from 'semantic-ui-react'
import Countdown from 'react-countdown-to-future-date';


function Header() {
  return (
    <Menu inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={process.env.PUBLIC_URL+ '/img/tymphany-logo.png'} style={{ marginRight: '1.5em' }} />
          Tymphany Bidding Activity
          {/* 2020歲末 帶顆喇叭回家！ */}
        </Menu.Item>
        <Menu.Item position='right' className="countdown">
          <span style={{whiteSpace:'pre'}}>距離截止剩   </span>
          <Countdown givenDate = {new Date(2021, 1, 5, 12, 0)}  />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Header;
