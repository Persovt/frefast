import React from "react";
import { connect } from "react-redux";
import { BsPlusCircle } from "react-icons/bs";
import { SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  StoreHoverAddCartButtonAC,
  StoreChangeVisibleRedactModelAC,
  StoreChangeVisibleCreateModelAC,
  StoreLoadProductFetchServerAC,
  StoreSetCurrectIdAC,
} from "../../state/reducer/store.reducer";
import "./Store.css";
import { CartAddProductAC } from "../../state/reducer/cart.reducer";
import { Card, Button, InputNumber } from "antd";
import CreateProduct from "./CreateProduct";
import RedactProduct from "./RedactProduct";
import { Container, Row, Col } from "react-bootstrap";
import { url } from "inspector";

class Store extends React.Component<any, any> {
  componentDidMount() {
    this.props.StoreLoadProductFetchServerAC();
  }

  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <CreateProduct />
        <RedactProduct />
        <Container>
          <Row>
            <Col className="gutter-row" md={4}>
              <Card
                onClick={() => this.props.StoreChangeVisibleCreateModelAC(true)}
                hoverable
                style={{ width: 250, height: 300, margin: "20px" }}
                bodyStyle={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <BsPlusCircle
                  style={{ width: "60%", height: "60%", opacity: 0.5 }}
                />
              </Card>
            </Col>

            {this.props.storeProducts?.length
              ? this.props.storeProducts.map((item: any, index: any) => {
                  let cartVisible;
                  return (
                    <Col className="gutter-row" key={item._id} md={4}>
                      {/* <div className="Card">
                        <div className="Card-img">
                          <img src={item.img} alt="" />
                        </div>
                        <div className="Card-body">
                          <div className="Card-name">{item.name}</div>
                          <div className="Card-amount">{item.amount}</div>
                        </div>
                        <div className="Card-footer">
                          <SettingOutlined
                            key="setting"
                            onClick={() => {
                              this.props.StoreChangeVisibleRedactModelAC(true);
                              this.props.StoreSetCurrectIdAC(item._id);
                            }}
                          />
                          <ShoppingCartOutlined
                            key="cart"
                            onClick={() => {
                              // this.props.CartAddProductAC(item);
                              //console.log(item)
                            }}
                          />
                        </div>
                      </div> */}

                      <Card
                        hoverable
                        onMouseOver={() =>
                          this.props.StoreHoverAddCartButtonAC({
                            id: index,
                            value: true,
                          })
                        }
                        onMouseOut={() =>
                          this.props.StoreHoverAddCartButtonAC({
                            id: index,
                            value: false,
                          })
                        }
                        bodyStyle={{
                          display: "grid",
                          gridTemplateRows: "auto 1fr 1fr",
                          gridTemplateColumns: "100%",

                          padding: 0,
                        }}
                        actions={
                          [
                            // <div
                            //   className=""
                            //   onClick={() => {}}
                            //   onMouseEnter={() => {}}
                            //   onMouseLeave={() => {}}
                            // >
                            //   {this.props.cartProducts.filter(
                            //     (i: any) => i._id === item._id
                            //   ).length ? (
                            //     // <ShoppingCartOutlined
                            //     //   key="cart"
                            //     //   onClick={() => {
                            //     //     this.props.CartAddProductAC(item);
                            //     //     console.log(item);
                            //     //   }}
                            //     // />
                            //     <>
                            //       <Button>+</Button>
                            //       <Button>-</Button>
                            //     </>
                            //   ) : (
                            //     <div
                            //       onMouseOver={() =>
                            //         this.props.StoreHoverAddCartButtonAC(true)
                            //       }
                            //       onMouseOut={() =>
                            //         this.props.StoreHoverAddCartButtonAC(false)
                            //       }
                            //       className=""
                            //     >
                            //       <Link
                            //         to="/productpage"
                            //         onClick={() =>
                            //           this.props.StoreSetCurrectIdAC(item._id)
                            //         }
                            //       >
                            //         <ShoppingCartOutlined key="cart" />
                            //       </Link>
                            //     </div>
                            //   )}
                            // </div>,
                          ]
                        }
                        style={{
                          width: 250,
                          minHeight: 300,
                          margin: "20px",
                          display: "grid",
                          gridTemplateRows: "auto 1fr auto",
                          gridTemplateColumns: "100%",
                          border: "1px solid silver",
                        }}
                        cover={
                          <div
                            className="card-image"
                            style={{
                              width: 240,
                              height: 240,
                              margin: "5px",
                              backgroundImage: "url(" + item.img + ")",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        }
                      >
                        <SettingOutlined
                          className="setting-icon"
                          key="setting"
                          onClick={() => {
                            this.props.StoreChangeVisibleRedactModelAC(true);
                            this.props.StoreSetCurrectIdAC(item._id);
                          }}
                        />
                        <p className="card__body-name card__body-text">
                          {" "}
                          {item.name}
                        </p>
                        {!item.visibleCart ? (
                          <div className="">
                            <p className="card__body-price card__body-text">
                              {item.price ? `${item.price} ₽` : "FREE"}
                            </p>
                            <p className="card__body-amount card__body-text">
                              Осталось: {item.amount}
                            </p>
                          </div>
                        ) : (
                          <Button
                            disabled={item.amount === 0}
                            style={{ height: 54, width: "100%" }}
                            onClick={() => this.props.CartAddProductAC(item)}
                            className="card-price card__body-text"
                          >
                            <ShoppingCartOutlined key="cart" />
                          </Button>
                        )}

                        {/* <Row>
                          <Col
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="card__body-name card__body-text">
                              {item.name}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Button
                              disabled={item.amount===0}
                              style={{ height: "100%", width: "100%" }}
                              onClick={() => this.props.CartAddProductAC(item)}
                              className="card-price card__body-text"
                            >

                              {item.price ? `${item.price} ₽` : 'FREE'}
                            </Button>
                          </Col>
                        </Row> */}

                        {/* <Meta description={item.name} /> */}
                      </Card>
                    </Col>
                  );
                })
              : null}
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    storeProducts: state.storeReducer?.storeProducts,
    cartProducts: state.cartReducer?.cartProducts,
    hoverAddCartButton: state.storeReducer.hoverAddCartButton,
  };
};

export default connect(mapStateToProps, {
  StoreHoverAddCartButtonAC,
  CartAddProductAC,
  StoreSetCurrectIdAC,
  StoreChangeVisibleRedactModelAC,
  StoreChangeVisibleCreateModelAC,

  StoreLoadProductFetchServerAC,
})(Store);
