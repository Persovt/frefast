import React from "react";
import { connect } from "react-redux";
import { ValidateTokenFetchServerAC } from "./state/auth.reducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Main, Cart, Store, Profile, NavBar, Admin } from "./pages/index.page";
import "antd/dist/antd.css";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";


class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.ValidateTokenFetchServerAC();
  }

  componentDidUpdate() {
    if (this.props.accesToken)
    
      setInterval(() => {
        this.props.ValidateTokenFetchServerAC();
      }, 100000);
  }

  render() {
    let router; //Лучше уйди и не трогай нахуй обьет
    switch (this.props.role) {
      case "admin":
        router = (
          <Switch>
            <Route path="/" exact>
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

            <Redirect to="/" />
          </Switch>
        );
        break;
      case "user":
        router = (
          <Switch>
            <Route path="/" exact>
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

            <Redirect to="/" />
          </Switch>
        );
        break;

      default:
        router = (
          <Switch>
            <Route path="/" exact>
              <Main />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/store" exact>
              <Store />
            </Route>

            <Redirect to="/" />
          </Switch>
        );
    }

    return (
      <>
        <Router>
          <NavBar />
          {router}
        </Router>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    role: state.data.role,
    loggin: state.loggin
  };
};

export default connect(mapStateToProps, {
  ValidateTokenFetchServerAC,
})(App);
