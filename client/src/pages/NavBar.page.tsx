import React from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { ShopOutlined, HomeOutlined } from "@ant-design/icons";
import { Drawer, Space, Input, Button } from "antd";
import {
  AuthInputAC,
  AuthLoginFetchServerAc,
  AuthRegFetchServerAc,
} from "../state/reducer/auth.reducer";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { CgProfile } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  state = {
    current: "main",
    setVisible: false,
  };

  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };
  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  showDrawer = () => {
    this.setState({ setVisible: true });
  };
  onClose = () => {
    this.setState({ setVisible: false });
  };

  render() {
    const { current } = this.state;
    let AuthButton;
    let AdminButton;

    if (!this.props.loggin) {
      AuthButton = (
        <Menu.Item
          key="Auth"
          onClick={this.showDrawer}
          icon={<BsPeople />}
          style={{ flexGrow: 1, textAlign: "center" }}
        >
          Auth
        </Menu.Item>
      );
    } else {
      if (this.props.role == "user")
        AdminButton = (
          <Menu.Item
            key="Admin"
            icon={<RiAdminLine />}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to="/admin">Admin</Link>
          </Menu.Item>
        );

      AuthButton = (
        <Menu.Item
          key="Profile"
          icon={<CgProfile />}
          style={{ flexGrow: 1, textAlign: "center" }}
        >
          <Link to="/profile">Profile</Link>
        </Menu.Item>
      );
    }
    return (
      <>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Menu.Item
            key="main"
            icon={<HomeOutlined />}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to="/">Main</Link>
          </Menu.Item>
          <Menu.Item
            key="cart"
            icon={<GiShoppingCart />}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item
            key="Store"
            icon={<ShopOutlined />}
            style={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link to="/store">Store</Link>
          </Menu.Item>
          {AuthButton}
          {AdminButton}
        </Menu>

        <Drawer
          title="Authoriz"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.setVisible}
        >
          <Space direction="vertical">
            <Input
              placeholder="input email"
              name="email"
              onChange={(e: any) =>
                this.props.AuthInputAC(this.changeHandler(e))
              }
            />

            <Input.Password
              placeholder="input password"
              name="password"
              onChange={(e: any) =>
                this.props.AuthInputAC(this.changeHandler(e))
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Space direction="horizontal">
              <Button
                onClick={() =>
                  this.props.AuthLoginFetchServerAc({
                    email: this.props.email,
                    password: this.props.password,
                  })
                }
              >
                Auth me!
              </Button>
              <Button
                onClick={() =>
                  this.props.AuthRegFetchServerAc({
                    email: this.props.email,
                    password: this.props.password,
                  })
                }
              >
                Reg me!
              </Button>
            </Space>
          </Space>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    role: state.authReducer.data.role,
    loggin: state.authReducer.loggin,
    email: state.authReducer.currectInput.email,
    password: state.authReducer.currectInput.password,
  };
};

export default connect(mapStateToProps, {
  AuthLoginFetchServerAc,
  AuthInputAC,
  AuthRegFetchServerAc,
})(NavBar);
