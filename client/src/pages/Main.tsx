import React from 'react';
import {connect} from 'react-redux'

class Main extends React.Component{
 render(){
     return(
         <>
         Hello!
         </>
     )
 }
}

const mapStateToProps = (state: any) => {
    return{
        

    }
}


export default connect(mapStateToProps, {
    
   
    
})(Main)