import React from 'react'
import {connect} from 'react-redux'
import { Card, Avatar ,Button} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
class Store extends React.Component <any,any> {

    render(){
        return(
            <>
           

            <Card
           
             hoverable
    style={{ width: 300, margin: "20px" }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
        <Button>Add cart</Button>
    ]}
  >
    <Meta
      description="This is the description"
    />
  </Card>
   
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return{
       
    }
  }
  
  
  export default connect(mapStateToProps, {
   
    
  })(Store)