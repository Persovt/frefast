import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Typography, Divider } from "antd";
import { Avatar, Collapse } from "antd";
import {
  OrderLoadFetchServerAC,
  OrderRedactFetchServerAC,
} from "../state/reducer/order.reducer";
import { AuthLogoutFetchServerAc } from "../state/reducer/auth.reducer";
import { Button, Layout, Menu } from "antd";
import { GiShoppingCart } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { ImExit } from "react-icons/im";
const { Header, Content, Footer, Sider } = Layout;
const { Panel } = Collapse;
class Profile extends React.Component<any, any> {
  componentDidMount() {
    this.props.OrderLoadFetchServerAC();
  }
  statusOrder = (status: any) => {
    switch (status) {
      case "sended":
        return (
          <p style={{ color: "green", margin: 0 }}>Статус заказа: {status}</p>
        );
      case "delivered":
        return (
          <p style={{ color: "green", margin: 0 }}>Статус заказа: {status}</p>
        );

      case "await":
        return (
          <p style={{ color: "orange", margin: 0 }}>Статус заказа: {status}</p>
        );

      default:
        return <p style={{ margin: 0 }}> Статус заказа: {status} </p>;
    }
  };
  render() {
    return (
      <>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider
              className="site-layout-background"
              width={200}
              style={{ height: "fit-content" }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <p
                  className=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    margin: 0,
                    padding: 20,
                    color: "silver",
                  }}
                >
                  Email: {this.props.data.email}
                </p>
                <p
                  className=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    margin: 0,
                    padding: 20,
                    color: "silver",
                  }}
                >
                  Role: {this.props.data.role}
                </p>
                <Menu.Item key="1" icon={<GiShoppingCart />}>
                  Заказы
                </Menu.Item>
                <Menu.Item key="2" disabled={true} icon={<FiSettings />}>
                  Настройки
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<ImExit />}
                  danger
                  onClick={this.props.AuthLogoutFetchServerAc}
                >
                  Выйти
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Container>
                <Collapse defaultActiveKey={["0"]}>
                  {this.props.order.map((item: any, index: number) => {
                    console.log(item);
                    if (item.userId === this.props.data.userId)
                      return (
                        <Panel
                          header={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <p style={{ margin: 0 }}>
                                  {" "}
                                  ID заказа: {item._id}{" "}
                                </p>
                                <p style={{ margin: 0 }}>
                                  {this.statusOrder(item.status)}
                                </p>
                              </div>

                              {item.status === "sended" ? (
                                <Button
                                  onClick={() =>
                                    this.props.OrderRedactFetchServerAC({
                                      status: "delivered",
                                      id: item._id,
                                    })
                                  }
                                >
                                  Принять
                                </Button>
                              ) : null}
                            </div>
                          }
                          key={index}
                        >
                          <p className="">Адрес: {item.data.adres} </p>
                          <p className="">Город: {item.data.city} </p>
                          <p className="">Индекс: {item.data.index} </p>
                          <p className="">Улица: {item.data.street} </p>

                          <h5>Товары:</h5>

                          <List
                            dataSource={item.products}
                            renderItem={(item: any) => (
                              <List.Item key={item._id}>
                                <List.Item.Meta
                                  avatar={<Avatar src={item.img} />}
                                  title={<a href="#">{item.name}</a>}
                                  description={item.description}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <p className="" style={{ margin: 0 }}>
                                    Цена:{" "}
                                    {item.price
                                      ? item.price * item?.count
                                      : "free"}{" "}
                                  </p>
                                  <p className="" style={{ margin: 0 }}>
                                    Колличество: {item.count}{" "}
                                  </p>
                                </div>
                              </List.Item>
                            )}
                          ></List>
                        </Panel>
                      );
                  })}
                </Collapse>
              </Container>
            </Content>
          </Layout>
        </Content>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state.authReducer.data,
    order: state.orderReducer?.orders,
  };
};

export default connect(mapStateToProps, {
  OrderLoadFetchServerAC,
  OrderRedactFetchServerAC,
  AuthLogoutFetchServerAc,
})(Profile);
