import React from 'react'
import {connect} from 'react-redux'
//import "./profile.css"
import { Container } from 'react-bootstrap';
class Profile extends React.Component <any,any> {

    render(){
        return(
            <>
            <Container>
              
               <p>Email: {this.props.data.email}</p>
               <p>Id: {this.props.data.userId}</p>
               <p>Role: {this.props.data.role}</p>
            </Container>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return{
       data: state.data
    }
  }
  
  
  export default connect(mapStateToProps, {
   
    
  })(Profile)