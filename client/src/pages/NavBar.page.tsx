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
import { NavBarChangeVisibleAuthSideBarAC } from "../state/reducer/navbar.reducer";
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

  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  render() {
    return (
      <>
        <Menu
          onClick={() => this.forceUpdate()}
          selectedKeys={[window.location.pathname]}
          mode="horizontal"
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <Menu.Item
            key="/main"
            icon={<HomeOutlined />}
            style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
          >
            <Link to="/main">Main</Link>
          </Menu.Item>
          <Menu.Item
            key="/cart"
            icon={<GiShoppingCart />}
            style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
          >
            <Link to="/cart">Cart</Link>
          </Menu.Item>
          <Menu.Item
            key="/store"
            icon={<ShopOutlined />}
            style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
          >
            <Link to="/store">Store</Link>
          </Menu.Item>

          {this.props.role ? (
            <Menu.Item
              key="/profile"
              icon={<CgProfile />}
              style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
            >
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          ) : (
            <Menu.Item
              key="/auth"
              onClick={() => this.props.NavBarChangeVisibleAuthSideBarAC(true)}
              icon={<BsPeople />}
              style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
            >
              Auth
            </Menu.Item>
          )}
          {this.props.role === "admin" ? (
            <Menu.Item
              key="/admin"
              icon={<RiAdminLine />}
              style={{ flexGrow: 1, justifyContent: "center", display: 'flex', alignItems: 'center' }}
            >
              <Link to="/admin">Admin</Link>
            </Menu.Item>
          ) : null}
        </Menu>

        <Drawer
          title="Authoriz"
          placement="right"
          closable={false}
          onClose={() => this.props.NavBarChangeVisibleAuthSideBarAC(false)}
          visible={this.props.loggin ? false : this.props.visibleAuthSideBar}
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
    visibleAuthSideBar: state.navbarReducer.visibleAuthSideBar,
    role: state.authReducer.data.role,
    loggin: state.authReducer.loggin,
    email: state.authReducer.currectInput.email,
    password: state.authReducer.currectInput.password,
  };
};

export default connect(mapStateToProps, {
  NavBarChangeVisibleAuthSideBarAC,
  AuthLoginFetchServerAc,
  AuthInputAC,
  AuthRegFetchServerAc,
})(NavBar);
