import React from 'react'
import { 
  Menu, 
  Image, 
  Icon,
  Container
} from 'semantic-ui-react'
import Countdown from 'react-countdown-to-future-date';


function Header(props) {

  return (
    <>
    <Menu >
        <Menu.Item as='a' header>
          <Image  src={process.env.PUBLIC_URL+ '/img/logo.png'} style={{ height: '60px', marginRight: '8px' }} />
          2021 Bidding Activity 
          <Icon name="exclamation" />
          {/* 2020歲末 帶顆喇叭回家！ */}
        </Menu.Item>
    </Menu>
    <div className="countdown">
      
      {props.timeOut? 
        <span>競標已截止</span>
      :
      <>
        <Icon style={{marginTop: "auto", marginBottom: 'auto'}} name="hourglass two" />
        <Countdown givenDate = {new Date(2021, 1, 5, 13, 0)} hangleTimeOut={props.hangleTimeOut} />

      </>
      }
    </div>
    <Container textAlign='center'className='anounce'>實體商品在 Ｄ棟 8樓 Blue 會議室</Container>
    </>
  );
}

export default Header;
