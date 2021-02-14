import React from "react";
import { connect } from "react-redux";
import {
  List,
  message,
  Avatar,
  Collapse,
  Button,
  Layout,
  InputNumber,
} from "antd";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  OrderLoadFetchServerAC,
  OrderRedactFetchServerAC,
} from "../state/reducer/order.reducer";
import { Menu } from "antd";
import { GiShoppingCart } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { FaMoneyCheckAlt } from 'react-icons/fa'
import {
  AdminInputAC,
  AdminApplyConfigAC,
} from "../state/reducer/admin.reducer";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Panel } = Collapse;
class Admin extends React.Component<any, any> {
  componentDidMount() {
    this.props.OrderLoadFetchServerAC();
    console.log(this.props.page);
  }
  componentDidUpdate() {
    console.log(this.props.page);
  }
  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };
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
      case "delivered":
        return (
          <p style={{ color: "green", margin: 0 }}>Статус заказа: {status}</p>
        );
      case "sended":
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
                  Баланс: {this.props.balance} ₽
                </p>
                <Menu.Item key="1" icon={<GiShoppingCart />}>
                  <Link to="/admin">Заказы</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FiSettings />}>
                  <Link to="/admin/settings">Настройки</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FaMoneyCheckAlt />}>
                  Вывести деньги
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Container>
                <div className="demo-infinite-container">
                  <Collapse defaultActiveKey={["0"]} onChange={this.callback}>
                    {this.props.page !== 2 ? (
                      this.props.order.map((item: any, index: number) => {
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

                                {item.status === "await" ? (
                                  <Button
                                    onClick={() =>
                                      this.props.OrderRedactFetchServerAC({
                                        status: "sended",
                                        id: item._id,
                                      })
                                    }
                                  >
                                    Отправить
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
                      })
                    ) : (
                      <div className="">
                        <div
                          className="priceDelivery"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <p style={{ margin: 0, marginRight: 10 }}>
                            Цена доставки:{" "}
                          </p>

                          <InputNumber
                            defaultValue={this.props.priceDelivery}
                            onChange={(value: any) =>
                              this.props.AdminInputAC({
                                name: "priceDelivery",
                                value,
                              })
                            }
                          />
                        </div>
                        <Button
                          type="primary"
                          style={{ margin: 10 }}
                          onClick={() =>
                            this.props.AdminApplyConfigAC(this.props.input)
                          }
                        >
                          Применить
                        </Button>
                      </div>
                    )}
                  </Collapse>
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
    priceDelivery: state.siteReducer.config.config.priceDelivery,
    data: state.authReducer.data,
    order: state.orderReducer.orders,
    balance: state.siteReducer.config.balance,
    input: state.adminReducer.currectInput,
  };
};

export default connect(mapStateToProps, {
  OrderLoadFetchServerAC,
  OrderRedactFetchServerAC,
  AdminInputAC,
  AdminApplyConfigAC,
})(Admin);
