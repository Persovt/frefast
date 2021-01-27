import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {ValidateTokenFetchServerAC, setDataAC} from './state/auth.reducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage'
import NavBar from './pages/AuthPage/NavBar'
import Profile from './pages/AuthPage/Profile'
import Store from './pages/AuthPage/Store'
import 'antd/dist/antd.css';
import './App.css';
import Admin from './pages/AuthPage/Admin'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class App extends React.Component <any,any> {
  constructor(props: any){
    super(props)
  }
  componentDidMount(){
  
   
      this.props.ValidateTokenFetchServerAC()

    
    
  }
  
 componentDidUpdate(){
  if(this.props.accesToken)
      setInterval(() => {
        this.props.ValidateTokenFetchServerAC()
      },100000)
 }
  

  render(){
    let router;
    console.log(this.props.role)
    if(this.props.loggin)
    if(this.props.role == 'admin')
     router = (
  
  
      <Switch>
         
      <Route path="/" exact>
              <MainPage/>
          </Route>
          <Route path="/contact" exact>
              <MainPage/>
          </Route>
          <Route path="/store" exact>
              <Store/>
          </Route>
          <Route path="/profile" exact>
              <Profile/>
          </Route>
          
          <Redirect to="/"/>
      </Switch>
      )
      else if(this.props.role == 'user')
      router = (
   
   
       <Switch>
          
       <Route path="/" exact>
               <MainPage/>
           </Route>
           <Route path="/contact" exact>
               <MainPage/>
           </Route>
           <Route path="/store" exact>
               <Store/>
           </Route>
           <Route path="/profile" exact>
               <Profile/>
           </Route>
           <Route path="/admin" exact>
               <Admin/>
           </Route>
           
           <Redirect to="/"/>
       </Switch>
       )

    else
    router =(
      
      <Switch>
               <Route path="/" exact>
                  <MainPage/>
              </Route>
              <Route path="/contact" exact>
                  <MainPage/>
              </Route>
              <Route path="/store" exact>
                  <Store/>
              </Route>
             
              <Redirect to="/"/>
      </Switch>
      
    )
  
  return(
   <>
   <Router >
    <NavBar/>
    {router}
   </Router>
   </>
  
  )
  }
  
}

const mapStateToProps = (state: any) => {
  return{
    role: state.data.role,
    loggin: state.loggin,
    accesToken: cookies.get('accesToken')
  }
}


export default connect(mapStateToProps, {
  ValidateTokenFetchServerAC,
  
})(App)


