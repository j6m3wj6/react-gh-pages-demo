import React, { useEffect } from 'react'
import { 
  Card, 
  Image, 
  Icon,
  Button,
  Grid
} from 'semantic-ui-react'

const card = (data) => {
  // console.log(`../img/${data._no}`)

  return (
    <Card>
      <Image  centered src={process.env.PUBLIC_URL+ `/img/${data._no}.jpg`}/>
      <Card.Content>
        <Card.Header>{data.module}</Card.Header>
        <Card.Meta>
          <span className='date'>{data.brand}</span>
        </Card.Meta>
        <Card.Description>
          {data.color}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Column floated='left' width={6} verticalAlign='middle'>
            <a>
              <Icon name='user' />
              出價情況
            </a>
          </Grid.Column>
          <Grid.Column floated='right' width={5}>
            <Button animated='vertical' >
              <Button.Content hidden>Bid</Button.Content>
              <Button.Content visible>
                <Icon name='dollar sign' />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid>
        
            
      </Card.Content>
      </Card>
  )
}

function Product(props) {
  const dataLength = props.data.length? props.data.length : 0;

  return (
    <>
    {dataLength > 0? 
      props.data.map(_d => card(_d))
      :
      card({brand: "testBrand", module: "testModule"})
    }
    </>
    
  );
}

export default Product;
