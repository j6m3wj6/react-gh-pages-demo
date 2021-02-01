import React, { useEffect } from 'react';
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

const sample1 = {
  "_no": "1",
  "brand": "iHome",
  "module": "IBN97",
  "color": "Grey",
  "type": "Sealed"
}

function Bidding (props) {
  const [data, setData] = React.useState({});
  const [info, setInfo] = React.useState({name: '', number: ''});
  const handleChange = (e , { name, value }) => {
    const newInfo = info;
    newInfo[name] = value;
    setInfo(newInfo);
    console.log(info)
  }



  const fetchResource = async() => {
    // const res = await axios.get(
    //   'https://tymphany-bidding-server.herokuapp.com/api/bidding'
    // )
    const res = await axios.get(
      'http://localhost:5000/api/bidding'
    )
    console.log('fetchResource', res)
    setData(res.data.content)
  }
  useEffect(() => { 
    fetchResource();
  }, [])
  return (
    <div className="App">
      <Headers />
      <Segment.Group horizontal  textAlign='center' style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <Product data={data}/>
      </Segment.Group>
    </div>
  );
}

export default Bidding;
