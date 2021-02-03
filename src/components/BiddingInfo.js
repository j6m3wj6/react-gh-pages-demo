import React from 'react'
import axios from 'axios'

import { 
  Grid, 
  Form, 
  Statistic,
  Button,
  Message,
  Label,
  Input
} from 'semantic-ui-react'


function BiddingInfo(props) {
  const [info, setInfo] = React.useState({name: '', number: '', email:'', price: ''});
  const [inputLessThanBasic, setLessThanBasic] = React.useState(false)
  const handleChange = (e , { name, value }) => {
    const newInfo = info;
    newInfo[name] = value;
    setInfo(newInfo);
    setLessThanBasic(false)
  }
  const handleSubmit = async () => {
    let inputValid = true;
    const emailFormat = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if ( !/./.test(info.name) || !/[0-9]{7}/.test(info.number) || 
        !emailFormat.test(info.email) || 
        !/^\d*[05]{1}0$/.test(info.price))
      inputValid = false

    if (info.price - props.basic_price < 0) {
      inputValid = false
      setLessThanBasic(true)
    }
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
      <Form error style={{  margin: '30px auto' }} >
      <Form.Field>
        <label id='movie'>姓名 (Name)</label>
        <Form.Input
          required={true}
          placeholder='ex. Tong Wang'
          name='name'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>工號 (EmployeeID)</label>
        <Form.Input
          required={true}
          pattern="[0-9]{7}"
          placeholder='ex. 2000xxx'
          name='number'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Email </label>
        <Form.Input
          required={true}
          type='email'
          placeholder='ex. tong.wang@tymphany.com'
          name='email'
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field >
        <label>出價 (Bid Price) </label>
        <div className="price-container">
          <Statistic color='red' size='small' className="price-basic">
              <Statistic.Value>{props.basic_price}</Statistic.Value>
              <Statistic.Label>底價  <br />Base price</Statistic.Label>
          </Statistic>
          <div className="price-input">
            <Input 
              required={true}
              pattern="^\d*[05]{1}0$"
              name='price'
              title="請以50元為單位出價。"
              labelPosition='left' type='text'
              onChange={handleChange}
              placeholder={`ex. ${props.basic_price}`}
              >
              <Label basic>$</Label>
              <input />
            </Input>
            <span className="caption">*請以50元為單位出價 <br />Price must be in multiples of 50</span>
          </div>
        </div>
        

        
      </Form.Field>
      {inputLessThanBasic && <Message
        error
        header='請輸入高於底價的數目'
        content="Price must be higher than base price"
      />}
      
      <Button type='submit' onClick={handleSubmit}>Submit</Button>
    </Form>
    </Grid>
  )
}

export default BiddingInfo;
