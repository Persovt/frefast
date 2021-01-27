import React from 'react';
import { connect } from 'react-redux'
import { inputReducer, AuthFetchServerAC, RegFetchServerAC } from '../state/auth.reducer'
import NavBar from './AuthPage/NavBar'




const MainPage = (props: any) => {
   

    return(
         <>
         Main
         </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        loggin: state.loggin,
        email: state.currectInput.email,
        password: state.currectInput.password

    }
}


export default connect(mapStateToProps, {
    AuthFetchServerAC,
    RegFetchServerAC,
    inputReducer,


})(MainPage)