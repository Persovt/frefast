import React from "react";
import { connect } from "react-redux";
import { List, message, Avatar, Collapse, Button, Layout } from "antd";
import { Container } from "react-bootstrap";
import {
  OrderLoadFetchServerAC,
  OrderRedactFetchServerAC,
} from "../state/reducer/order.reducer";
import { Menu } from "antd";
import { GiShoppingCart } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;
class Admin extends React.Component<any, any> {
  componentDidMount() {
    this.props.OrderLoadFetchServerAC();
  }

  callback(key: any) {
    console.log(key);
  }
  state = {
    current: "mail",
  };

  handleClick = (e: any) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };
  statusOrder = (status: any) => {
    switch (status) {
      case "sended":
        return <text style={{ color: "green" }}>{status}</text>;

      case "await":
        return <text style={{ color: "orange" }}>{status}</text>;

      default:
        return <text> {status} </text>;
    }
  };
  render() {
    console.log(this.props.order);
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
                    textAlign: "center",
                    padding: 20,
                    color: "silver",
                  }}
                >
                  Баланс: 100
                </p>
                <Menu.Item key="1" icon={<GiShoppingCart />}>
                  Заказы
                </Menu.Item>
                <Menu.Item key="2" icon={<FiSettings />}>
                  Настройки
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Container>
                <div className="demo-infinite-container">
                  <Collapse defaultActiveKey={["0"]} onChange={this.callback}>
                    {this.props.order.map((item: any, index: number) => {
                      return (
                        <Panel
                          header={
                            <>
                              <p style={{ margin: 0 }}>
                                {" "}
                                ID заказа: {item._id}{" "}
                              </p>
                              <p style={{ margin: 0 }}>
                                Статус заказа:
                                {this.statusOrder(item.status)}
                              </p>
                              {item.status === "await" ? (
                                <Button
                                  onClick={() =>
                                    this.props.OrderRedactFetchServerAC({
                                      status: "sended",
                                      id: item._id,
                                    })
                                  }
                                >
                                  Отправленно
                                </Button>
                              ) : null}
                            </>
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

                  {/* <List
              dataSource={this.props.order}
              renderItem={(item: any) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{}</a>}
                    //description={item.name}
                  />
                  <p className="">Adres: {item.data.adres} </p>
                  <p className="">City: {item.data.city} </p>
                  <p className="">Index: {item.data.index} </p>
                  <p className="">Street: {item.data.street} </p>
                  <p className="">Status: {item.status} </p>
                </List.Item>
              )}
            ></List> */}
                </div>
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
})(Admin);
