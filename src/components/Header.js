import React from 'react'
import { 
  Menu, 
  Container, 
  Image, 
} from 'semantic-ui-react'
import Countdown from 'react-countdown-to-future-date';


function Header(props) {

  return (
    <>
    <Menu inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={process.env.PUBLIC_URL+ '/img/tymphany-logo.png'} style={{ marginRight: '1.5em' }} />
          Tymphany Bidding Activity
          {/* 2020歲末 帶顆喇叭回家！ */}
        </Menu.Item>
        
      </Container>
      
    </Menu>
    <div className="countdown">
      
      {props.timeOut? 
        <span>競標已截止</span>
      :
      <>
        <span style={{whiteSpace:'pre'}}>距離截止剩   </span>
        <Countdown givenDate = {new Date(2021, 1, 3, 14, 55)} hangleTimeOut={props.hangleTimeOut} />
      </>
      }
    </div>
    </>
  );
}

export default Header;
