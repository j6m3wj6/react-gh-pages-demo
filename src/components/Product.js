import React, { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment' 
import { 
  Image, 
  Icon,
  Button,
  Divider,
  Grid,
  Form,
  List,
  Loader
} from 'semantic-ui-react'


const BiddingInfo = (props) => {
  const [info, setInfo] = React.useState({name: '', number: '', email:'', price: ''});
  
  const handleChange = (e , { name, value }) => {
    const newInfo = info;
    newInfo[name] = value;
    setInfo(newInfo);
  }
  const handleSubmit = async () => {
    let inputValid = true;
    const emailFormat = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if ( !/./.test(info.name) || !/[0-9]{7}/.test(info.number) || 
        !emailFormat.test(info.email) || 
        !/^\d*[05]{1}0$/.test(info.price))
      inputValid = false
    
    const updateData = {
        _no: props._no,
        updateContent: {
            bidding: {
                ...info,
                time: Date.now()
            }
        }
    }
    if (inputValid) submitBidding(updateData)
    else console.log("not complete")
  }

  const submitBidding = async (data) => {
    return await axios.post('https://tymphany-bidding-server.herokuapp.com/api/bidding/append', 
      data, 
      {'Content-Type': 'application/json'})
        .then((response) => {
          props.submitFinish();
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
      })
  }


  return (
    <Grid horizontal >
      <Form success style={{  margin: '30px auto' }} >
      <Form.Field>
        <label id='movie'>姓名 (Name)</label>
        <Form.Input
          required={true}
          placeholder='Tong Wang'
          name='name'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>工號 (EmployeeID)</label>
        <Form.Input
          required={true}
          pattern="[0-9]{7}"
          placeholder='2000xxx'
          name='number'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email </label>
        <Form.Input
          required={true}
          type='email'
          placeholder='tong.wang@tymphany.com'
          name='email'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field >
        <label>出價 (Bidding Price) </label>
        <Form.Input 
          required={true}
          pattern="^\d*[05]{1}0$"
          placeholder='請輸入50的倍數 '
          title="請輸入50的倍數。 This number must be in multiples of 50"
          name='price'
          onChange={handleChange}
        />
        <span className="caption">*This number must be in multiples of 50</span>
      </Form.Field>
      
      {/* <Message
        success
        header='Form Completed'
        content="Check the bidding status"
      /> */}
      
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
    </Grid>
  )
}

const DetailInfo = (props) => {
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
      <Divider horizontal>History</Divider>
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
      </List>
    </>
  )
}

function Product(props) {
  const dataLength = props.data.length? props.data.length : 0;
  const [showDetail, setDetail] = React.useState(-1);
  const [showBid, setBid] = React.useState(-1);
  
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
  
  const submitFinish = () => { setBid(-1) }

  const Card = ({data, index} ) => {
    const biddingData = data.bidding
    biddingData.sort(function(a, b) {
        return (b.price - a.price)
    });

    const heighestPrice = biddingData.length>0? `即時出價 $ ${biddingData[0].price}`: '尚未有人出價'
    
    return (
      <div className='tg_card' >
        <div className='img-content'>
          <Image className='img' centered src={process.env.PUBLIC_URL+ `/img/${data._no}.jpg`}/>
        </div>
        <div style={{ height: 'fit-content' }}>
          <h5 className='brand'> {`#${data._no} ${data.module}`}</h5>
          <p>{data.brand}</p>
          {data.set.length>0 && <p className='set'>set with: {data.set}</p>}
        </div>
        <Divider />
        <div>
          <p className='price-title'> {heighestPrice}</p>
        </div>
        <div className='operations-buttons'>
          <Button inverted color='blue' className='operation-button' name={index} onClick={handleOnClickDetail}> Detail </Button>
          <Button inverted color='red' className='operation-button' name={index} onClick={handleOnClickBid}> Bid </Button>
          {(index == showDetail || index == showBid) && <Icon name="chevron up" bordered style={{minWidth: '30px', margin: 'auto', borderRadius: '3px'}} onClick={chevronUp}/>}
        </div>
        {index == showDetail && <DetailInfo data={data} biddingData={biddingData} />}
        {index == showBid && <BiddingInfo _no={data._no} submitFinish={submitFinish}/>}
      </div>   
    )
  }

  return (
    <>
      {props.data.map((_d, index) => 
        <Card data={_d} index={index} />)}
    </>
    
  );
}

export default Product;
