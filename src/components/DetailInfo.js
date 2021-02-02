import React, { useEffect } from 'react'
import axios from 'axios'

import { 
  Image, 
  Icon,
  Button,
  Divider,
  Loader,
  Message
} from 'semantic-ui-react'


function DetailInfo(props) {
  const [biddingData, setData] = React.useState(props.biddingData)
  const fetchResource = async() => {
    const res = await axios.get(
      `https://tymphany-bidding-server.herokuapp.com/api/bidding?_no=${props.data._no}`
    )
    setData(res.data.content[0].bidding)
  }
  useEffect(() => { 
    fetchResource();
  }, [])  
  
  return (
    <>
      <div className='detail'>
        <span className='conditions'><strong> Check: </strong>{props.data.conditions}</span>
        <p className='shortage'><strong> Shortage: </strong> {props.data.shortage}</p>
      </div>
      {/* <Divider horizontal>History</Divider>
      <List divided relaxed className='bidding'>
        {biddingData.length > 0 && biddingData.map((_d, index) => {
          return(
            <List.Item>
              <List.Content floated='right'>
                  <h5 className='bidding-name'>${_d.price}</h5>
              </List.Content>
              <List.Icon name='dollar' size='large' verticalAlign='middle' />
              
              <List.Content>
                  <h5 className='bidding-name'>{_d.name}</h5>
                  <p className='bidding-time'>{moment(_d.time).format("MMMM Do YYYY, h:mm:ss a")}</p>
                
              </List.Content>
            </List.Item>
          )
        })} 
      </List> */}
    </>
  )
}

export default DetailInfo;
