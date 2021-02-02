import React from "react";
import { connect } from "react-redux";
import { AuthValidateTokenFetchServerAc,AuthInputAC } from "./state/reducer/auth.reducer";
import { Layout, Menu, Breadcrumb } from "antd";
import {SiteCheackFetchServerAC} from './state/reducer/site.reducer'
import { Main, Cart, Store, Profile, NavBar, Admin,ProductPage } from "./pages/index.page";
import "antd/dist/antd.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.SiteCheackFetchServerAC(window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'frefast')
  // this.props.AuthInputAC({ value: window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'frefast', name: 'siteName' })
    //cookies.set('siteName')
   this.props.AuthValidateTokenFetchServerAc();
  }

  componentDidUpdate() {
    this.props.SiteCheackFetchServerAC(window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'frefast')
    //this.props.AuthInputAC({ value: window.location.host.split('.')[1] ? window.location.host.split('.')[0] : 'frefast', name: 'siteName' })
    if (this.props.accesToken)
      setInterval(() => {
        this.props.AuthValidateTokenFetchServerAc();
      }, 100000);
  }

  render() {
   // console.log(window.location.host.split('.')[1] ? window.location.host.split('.')[0] : '/')
    let router; //Лучше уйди и не трогай нахуй обьет
    switch (this.props.role) {
      case "user":
        router = (
          <Switch>
            <Route path="/main" exact>
              <Main />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/store" exact>
              <Store />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/productpage" exact>
              <ProductPage />
            </Route>
            <Redirect to="/main" />
          </Switch>
        );
        break;
      case "admin":
        router = (
          <Switch>
            <Route path="/main" exact>
              <Main />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/store" exact>
              <Store />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/admin" exact>
              <Admin />
            </Route>
            <Route path="/productpage" exact>
              <ProductPage />
            </Route>
            
            <Redirect to="/main" />
          </Switch>
        );
        break;

      default:
        router = (
          <Switch>
            <Route path="/main" exact>
              <Main />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/store" exact>
              <Store />
            </Route>

            <Redirect to="/main" />
          </Switch>
        );
    }

    return (
      <>
        <Router>
          <Header style={{backgroundColor: 'white'}}>
            <NavBar />
          </Header>
          <Content style={{ padding: "0 50px" }}>
          
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
               {/* <Sider className="site-layout-background" style={{backgroundColor: 'black'}} width={200}>
              Реклама
            </Sider> */}
            <Content style={{ padding: '0 24px', minHeight: 280 }}> 
           
            {router}
            </Content>
             
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center",backgroundColor: 'white' }}>
           frefast.com ©2021 
          </Footer>
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    role: state.authReducer.data.role,
    loggin: state.authReducer.loggin,
    accesToken: cookies.get("accesToken"),
  };
};

export default connect(mapStateToProps, {
  AuthValidateTokenFetchServerAc,
  AuthInputAC,
  SiteCheackFetchServerAC
})(App);
