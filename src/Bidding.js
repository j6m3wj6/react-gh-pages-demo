import React from 'react';
import Headers from './components/Header'
import Product from './components/Product'
import { 
  Form,
  Button,
  Checkbox,
  Segment,
  Grid,
  Message,
} from 'semantic-ui-react'

import axios from 'axios' 


function Bidding (props) {
  const [info, setInfo] = React.useState({name: '', number: ''});
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState({});
  const handleChange = (e , { name, value }) => {
    const newInfo = info;
    newInfo[name] = value;
    setInfo(newInfo);
    console.log(info)
  }

  const handleSubmit = async (e , { name, value }) => {
    setText(info.name)
    // const res = await axios.get(
    //   'https://tymphany-bidding-server.herokuapp.com/api/bidding'
    // )
    const res = await axios.get(
      'http://localhost:5000/api/bidding'
    )
    console.log('submit', res)
    setData(res.data.content)
  }
  console.log('Data', data[0])
  return (
    <div className="App">
      <Headers />
      <Segment tertiary style={{ overflow: 'auto', maxWidth: '100wh' }}>
      <Segment.Group horizontal style={{ width: 'fit-content', margin: 'auto' }} textAlign='center'>
        <Product data={data}/>
        {/* {data.length > 0 && data.map(_d => {
          <Segment style={{ minWidth: '300px' }}>
            <Product data={_d}/>
          </Segment>
        })} */}
        {/* <Segment style={{ minWidth: '300px' }}>
          <Product />
        </Segment>
        <Segment style={{ minWidth: '300px' }}>
          <Product />
        </Segment> */}
      </Segment.Group>
      </Segment>
      <Segment> {text} </Segment>
      <Grid horizontal >
        <Form success style={{  margin: '30px auto' }}>
        <Form.Field>
          <label id='movie'>姓名(Name)</label>
          <Form.Input
            placeholder='Tong Wang'
            name='name'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>工號</label>
          <Form.Input
            placeholder='2000xxx'
            name='number'
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        {/* <Message
          success
          header='Form Completed'
          content="Check the bidding status"
        /> */}
        
        <Button type='submit' onClick={handleSubmit}>Submit</Button>
      </Form>
      </Grid>
    </div>
  );
}

export default Bidding;
