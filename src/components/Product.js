import React, { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment' 
import { 
  Image, 
  Icon,
  Button,
  Divider,
  Loader,
  Message,
} from 'semantic-ui-react'
import BiddingInfo from './BiddingInfo'
import DetailInfo from './DetailInfo'


function Product(props) {
  const [showDetail, setDetail] = React.useState(-1);
  const [showBid, setBid] = React.useState(-1);
  const [data, setData] = React.useState({});
  const fetchResource = async() => {
    const res = await axios.get(
      'https://tymphany-bidding-server.herokuapp.com/api/bidding'
    )
    console.log('fetchResource', res)
    setData(res.data.content)
  }
  useEffect(() => { 
    fetchResource();
  }, [])

  const handleOnClickDetail = (event) => {
    setDetail(event.target.name)
    setBid(-1)
  }
  const handleOnClickBid= (event) => {
    setBid(event.target.name)
    setDetail(-1)
  }
  const chevronUp = () => {
    setBid(-1)
    setDetail(-1)
  }

  const submitFinish = () => { 
    setBid(-1);
    fetchResource();
  }

  const Card = ({data, index} ) => {
    const biddingData = data.bidding
    biddingData.sort(function(a, b) {
        return (b.price - a.price)
    });

    const heighestPrice_title = biddingData.length > 0? `即時出價 Current Bid $ `: '尚未有人出價 Starting Bid $ '
    const heighestPrice = biddingData.length > 0? `${biddingData[0].price}`: `${data.basic_price}`
    
    return (
      <div className='tg_card' >
        <div className='img-content'>
          <Image className='img' centered src={process.env.PUBLIC_URL+ `/img/${data._no}.jpg`}/>
        </div>
        <div style={{ height: 'fit-content' }}>
          <h5 className='brand'> {`#${data._no} ${data.module}`}</h5>
          <div style={{display:'flex', flexDirection: 'row', justifyContent:"space-between"}}>
            <p>{data.brand}</p>
            <p style={{marginRight: '8px'}}>pcs: {data.pcs}</p>
          </div>
          {data.set.length>0 && <p className='set'>set with: {data.set}</p>}
        </div>
        <Divider />
        <div>
          <p className='price-title'> {heighestPrice_title} <strong style={{fontSize: '18px', color: '#0077aa' }}> {heighestPrice} </strong></p>
        </div>
        <div className='operations-buttons'>
          <Button inverted color='blue' className='operation-button' name={index} onClick={handleOnClickDetail}> View Details </Button>
          <Button inverted color='red' className='operation-button' name={index} onClick={handleOnClickBid}> Bid Now </Button>
          {(index == showDetail || index == showBid) && 
            <Icon name="chevron up" bordered onClick={chevronUp}
              style={{minWidth: '30px', margin: 'auto', borderRadius: '3px'}} />}
        </div>
        {index == showDetail && <DetailInfo data={data} biddingData={biddingData} />}
        {index == showBid &&
          (props.timeOut?
            <Message
              info
              header={`得標者 (Winner)： ${biddingData.length > 0? biddingData[0].name: '無'}`}
              content={`得標金額 (Endding Price): ${heighestPrice}`}
            />
          :
          <BiddingInfo basic_price={data.basic_price} _no={data._no} submitFinish={submitFinish}/>
        )}
      </div>   
    )
  }

  return (
    <>
      {data.length > 0 ? 
        data.map((_d, index) => <Card data={_d} index={index} />)
      :
        <div className='loader-container' >
          <Loader active inline='centered' className='loader' />
          <span style={{margin: '16px', color: '#485146'}}>Loading... (about 30 seconds)</span>
        </div>
      }
    </>
    
  );
}

export default Product;
