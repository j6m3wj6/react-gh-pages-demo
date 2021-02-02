import React, { useEffect } from 'react';
import Headers from './components/Header'
import Product from './components/Product'
import { 
  Segment,
  Loader
} from 'semantic-ui-react'
import axios from 'axios' 


function Bidding (props) {
  const [data, setData] = React.useState({});
  const [info, setInfo] = React.useState({name: '', number: ''});
  const [timeOut, setTimeOut] = React.useState(false)

  const fetchResource = async() => {
    const res = await axios.get(
      'https://tymphany-bidding-server.herokuapp.com/api/bidding'
    )
    // const res = await axios.get(
    //   'http://localhost:5000/api/bidding'
    // )
    console.log('fetchResource', res)
    setData(res.data.content)
  }
  useEffect(() => { 
    fetchResource();
  }, [])

  const hangleTimeOut = () => {
    console.log('timeOut')
    setTimeOut(true);
  }

  return (
    <div className="App">
      <Headers timeOut={timeOut} hangleTimeOut={hangleTimeOut}/>
        <Segment.Group horizontal textAlign='center' >
          <Product timeOut={timeOut} data={data}/>
        </Segment.Group>
    </div>
  );
}

export default Bidding;
