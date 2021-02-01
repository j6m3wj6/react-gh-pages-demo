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
  List
} from 'semantic-ui-react'


const BiddingInfo = (props) => {
  const [info, setInfo] = React.useState({name: '', number: '', email:'', price: ''});
  const handleChange = (e , { name, value }) => {
    const newInfo = info;
    newInfo[name] = value;
    setInfo(newInfo);
    // console.log(info)
  }
  const handleSubmit = async () => {
    let completeInfo = true;
    Object.values(info).forEach(element => {
      if (element.length == 0) completeInfo=false;
    });
    const updateData = {
        _no: props._no,
        updateContent: {
            bidding: {
                ...info,
                time: Date.now()
            }
        }
    }
    if (completeInfo) submitBidding(updateData)
    else console.log("not complete")
  }
  const submitBidding = async (data) => {
    return await axios.post('https://tymphany-bidding-server.herokuapp.com/api/bidding', 
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
          placeholder='Tong Wang'
          name='name'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>工號 (EmployeeID)</label>
        <Form.Input
          placeholder='2000xxx'
          name='number'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email </label>
        <Form.Input
          placeholder='tong.wang@tymphany.com'
          name='email'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>出價 (Bidding Price) </label>
        <Form.Input
          placeholder='tong.wang@tymphany.com'
          name='price'
          onChange={handleChange}
        />
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
  const [data, setData] = React.useState({})
  const [showContent, setContent] = React.useState(false)
  const fetchResource = async() => {
    const res = await axios.get(
      `https://tymphany-bidding-server.herokuapp.com/api/bidding?_no=${props._no}`
    )
    // const res = await axios.get(
    //   `http://localhost:5000/api/bidding?_no=${props._no}`
    // )
    // console.log('fetchResource', res.data.content[0].bidding)
    setData(res.data.content[0].bidding)
    
    res.data.content[0].bidding.sort(function(a, b) {
      return (b.price - a.price)
    });

    setContent(true)
  }
  useEffect(() => { 
    fetchResource();
  }, [])
  
  return (
    <>
      <List divided relaxed className='detail'>
        {data.length > 0 && data.map((_d, index) => {
          return(
            <List.Item>
              <List.Content floated='right'>
                  <h5 className='detail-name'>${_d.price}</h5>
              </List.Content>
              <List.Icon name='dollar' size='large' verticalAlign='middle' />
              
              <List.Content>
                  <h5 className='detail-name'>{_d.name}</h5>
                  <p className='detail-time'>{moment(_d.time).format("MMMM Do YYYY, h:mm:ss a")}</p>
                
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
    // console.log(event.target.name)
    setDetail(event.target.name)
    setBid(-1)
  }
  const handleOnClickBid= (event) => {
    // console.log(event.target.name)
    setBid(event.target.name)
    setDetail(-1)
  }
  const chevronUp = () => {
    setBid(-1)
    setDetail(-1)
  }
  
  const submitFinish = () => {
    setBid(-1)
  }

  const Card = ({data, index} ) => {
    return (
      <div className='tg_card' >
        <Image className='img' centered src={process.env.PUBLIC_URL+ `/img/${data._no}.jpg`}/>
        <div style={{ height: 'fit-content' }}>
          <h5 className='brand'> {data.module}</h5>
          <p>{data.brand}</p>
        </div>
        <Divider />
        <div>
          <p className='price-title'> 即時出價 $ </p>
        </div>
        <div className='operations-buttons'>
          <Button inverted color='blue' className='operation-button' name={index} onClick={handleOnClickDetail}> Detail </Button>
          <Button inverted color='red' className='operation-button' name={index} onClick={handleOnClickBid}> Bid </Button>
          {(index == showDetail || index == showBid) && <Icon name="chevron up" bordered style={{minWidth: '30px', margin: 'auto', borderRadius: '3px'}} onClick={chevronUp}/>}
        </div>
        {index == showDetail && <DetailInfo _no={data._no} />}
        {index == showBid && <BiddingInfo _no={data._no} submitFinish={submitFinish}/>}
      </div>   
    )
  }

  return (
    <>
    {dataLength > 0? 
      props.data.map((_d, index) => 
        <Card data={_d} index={index} />)
      :
      <>

      </>
    }
    </>
    
  );
}

export default Product;
