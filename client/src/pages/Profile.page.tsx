import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Typography, Divider } from "antd";
import { Avatar, Collapse } from "antd";
import { OrderLoadFetchServerAC,OrderRedactFetchServerAC } from "../state/reducer/order.reducer";
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
                <Menu.Item key="2" icon={<FiSettings />}>
                  Настройки
                </Menu.Item>
                <Menu.Item key="3" icon={<ImExit />} danger onClick={() => {}}>
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
                          header={item._id + "  Status:  " + item.status}
                          key={index}
                        >
                          <p className="">Adres: {item.data.adres} </p>
                          <p className="">City: {item.data.city} </p>
                          <p className="">Index: {item.data.index} </p>
                          <p className="">Street: {item.data.street} </p>

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
})(Profile);
