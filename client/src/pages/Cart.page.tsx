import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

import { List, Avatar, Divider, Button, Modal, Input, Layout } from "antd";
import { SiteAddFetchServerAC } from "../state/reducer/site.reducer";
//import { CardOrderAddFetchServerAC } from "../state/reducer/order.reducer";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  CartAddCountProductAC,
  CartOpenConfirmModelAC,
  CartInputAC,
  CardOrderAddFetchServerAC,
} from "../state/reducer/cart.reducer";
const { Header, Content, Footer, Sider } = Layout;
class Cart extends React.Component<any, any> {
  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  render() {
    return (
      <>
        <Modal
          title="Confirm order"
          visible={this.props.visibleConfirmModel}
          onOk={() => {
            this.props.CardOrderAddFetchServerAC({
              siteName: this.props.siteName,
              adres: this.props.adres,
              city: this.props.city,
              street: this.props.street,
              index: this.props.index,
              userId: this.props.userId,
              products: this.props.cartProducts,
              price:
                this.props.cartProducts.reduce(
                  (prev: any, next: any) => prev + next.price * next.count,
                  0
                ) + this.props.priceDelivery,
            });
            this.props.CartOpenConfirmModelAC(false);
          }}
          onCancel={() => this.props.CartOpenConfirmModelAC(false)}
        >
          {this.props.cartTypes.find((element: any) => element === "site") ? (
            <>
              <Divider orientation="left">Site settings</Divider>
              <Input
                placeholder="siteName"
                name="siteName"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
            </>
          ) : null}
          {this.props.cartTypes.find(
            (element: any) => element === "product"
          ) ? (
            <>
              <Divider orientation="left">Delivery settings</Divider>
              <Input
                placeholder="Adres"
                name="adres"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="Street"
                name="street"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="City"
                name="city"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
              <Input
                placeholder="index"
                name="index"
                onChange={(e: any) =>
                  this.props.CartInputAC(this.changeHandler(e))
                }
              />
            </>
          ) : null}
        </Modal>

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
                    fontWeight: 600,
                    textAlign: "center",
                    padding: 20,
                    lineHeight: 1,
                    fontSize:'1.5rem',
                   // color: "silver",
                   opacity: 0.9
                  }}
                >
                  <p> Сумма без доставки: </p>
                  {this.props.cartProducts.reduce(
                    (prev: any, next: any) => prev + next.price * next.count,
                    0
                  )}{" "}
                  ₽
                </p>
                <p
                  className=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    textAlign: "center",
                    padding: 20,
                   // color: "silver",
                  }}
                >
                  <p> Цена доставки: </p>
                  {this.props.priceDelivery} ₽
                </p>
                <p
                  className=""
                  style={{
                    fontSize: "1rem",
                    fontWeight: 300,
                    textAlign: "center",
                    padding: 20,
                    //color: "silver",
                  }}
                >
                  <p style={{lineHeight: 1}}>
                    Итого:
                    </p>
                    <p>
                      {this.props.cartProducts.reduce(
                        (prev: any, next: any) =>
                          prev + next.price * next.count,
                        0
                      ) + this.props.priceDelivery}{" "}
                      ₽
                   
                  </p>
                </p>
                <Menu.Item
                  disabled={
                    !this.props.cartProducts.length || !this.props.loggin
                  }
                  style={{ textAlign: "center", paddingRight: 24 }}
                  onClick={() => this.props.CartOpenConfirmModelAC(true)}
                >
                  Заказать
                </Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Container>
                <List
                  itemLayout="horizontal"
                  dataSource={this.props.cartProducts}
                  renderItem={(item: any, index: any) => (
                    <List.Item
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.img} />}
                        title={<a>{item.name}</a>}
                        description={item.description}
                      />
                      <p style={{ margin: 0, marginRight: 25 }}>
                        Осталось: {item.amount - item.count}
                      </p>
                      <p style={{ margin: 0, marginRight: 25 }}>
                        Цена: {item.price ? item.price * item.count : "free"}
                      </p>
                      <Button
                        disabled={item.count > item.amount - 1}
                        onClick={() =>
                          this.props.CartAddCountProductAC({
                            count: item.count + 1,
                            index,
                          })
                        }
                      >
                        +
                      </Button>
                      <Input
                        value={item.count}
                        type="number"
                        placeholder="count"
                        name="count"
                        style={{ width: "100px", textAlign: "center" }}
                        onChange={(e: any) =>
                          this.props.CartInputAC(this.changeHandler(e))
                        }
                      />
                      <Button
                        onClick={() =>
                          this.props.CartAddCountProductAC({
                            count: item.count - 1,
                            index,
                          })
                        }
                      >
                        -
                      </Button>
                    </List.Item>
                  )}
                />

                {/* <Button
                  disabled={!this.props.cartProducts.length}
                  type="primary"
                  onClick={() => this.props.CartOpenConfirmModelAC(true)}
                >
                  Confirm
                </Button> */}
                {/* <Button type="primary" onClick={( ) => {
            this.props.SiteAddFetchServerAC({siteName: 'frefast'})
          }}>Add site</Button> */}
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
    priceDelivery: state.siteReducer.config?.config?.priceDelivery,
    cartProducts: state.cartReducer.cartProducts,
    visibleConfirmModel: state.cartReducer.visibleConfirmModel,
    cartTypes: state.cartReducer.cartTypes,
    siteName: state.cartReducer.currectInput.siteName,
    adres: state.cartReducer.currectInput.adres,
    city: state.cartReducer.currectInput.city,
    street: state.cartReducer.currectInput.street,
    index: state.cartReducer.currectInput.index,
    userId: state.authReducer.data.userId,
    loggin: state.authReducer.loggin,
  };
};

export default connect(mapStateToProps, {
  CartInputAC,
  CartAddCountProductAC,
  SiteAddFetchServerAC,
  CardOrderAddFetchServerAC,
  CartOpenConfirmModelAC,
})(Cart);
