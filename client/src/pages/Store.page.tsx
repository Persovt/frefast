import React from "react";
import { connect } from "react-redux";
import { BsPlusCircle } from "react-icons/bs";
import {
  SettingOutlined,
  UploadOutlined,
  ShoppingCartOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  StoreInputAC,
  StoreChangeVisibleRedactModelAC,
  StoreChangeVisibleCreateModelAC,
  StoreLoadProductFetchServerAC,
  StoreAddProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
  StoreRedactProductFetchServerAC,
  StoreSetCurrectIdAC,
} from "../state/reducer/store.reducer";
import { Modal, Upload, message, Row, Col, Card, Button, Input } from "antd";

import { Container } from "react-bootstrap";
const { Meta } = Card;

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
        <Modal
          title="Create new product"
          visible={this.props.visibleCreateModel}
          onOk={() =>
            this.props.StoreAddProductFetchServerAC({
              imageUrl: this.props.imageUrl,
              nameProduct: this.props.nameProduct,
              descriprionProduct: this.props.descriprionProduct,
            })
          }
          onCancel={() => this.props.StoreChangeVisibleCreateModelAC(false)}
        >
          <Input
            placeholder="name product"
            name="nameProduct"
            onChange={(e: any) =>
              this.props.StoreInputAC(this.changeHandler(e))
            }
          />

          <Input
            placeholder="description product"
            name="descriprionProduct"
            onChange={(e: any) =>
              this.props.StoreInputAC(this.changeHandler(e))
            }
          />

          {/* <Upload
            onChange={this.handleChange}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
          <img src={this.props.imageUrl} style={{ width: 300, height: 300 }} />
        </Modal>
        <Modal
          title="Redact product"
          visible={this.props.visibleRedactModel}
          footer={
            <>
              <Button
                danger
                onClick={() =>
                  this.props.StoreDeleteProductFetchServerAC({
                    currectId: this.props.currectId,
                  })
                }
              >
                DELE VSE NAXY
              </Button>
              <Button
                type="primary"
                onClick={() =>
                  this.props.StoreRedactProductFetchServerAC({
                    imageUrl: this.props.imageUrl,
                    nameProduct: this.props.nameProduct,
                    descriprionProduct: this.props.descriprionProduct,
                    id: this.props.currectId,
                  })
                }
              >
                Ok
              </Button>
              <Button
                onClick={() =>
                  this.props.StoreChangeVisibleRedactModelAC(false)
                }
              >
                Canel
              </Button>
            </>
          }
        >
          <Input
            placeholder="name product"
            name="nameProduct"
            onChange={(e: any) =>
              this.props.StoreInputAC(this.changeHandler(e))
            }
          />

          <Input
            placeholder="description product"
            name="descriprionProduct"
            onChange={(e: any) =>
              this.props.StoreInputAC(this.changeHandler(e))
            }
          />

          {/* <Upload
            onChange={this.handleChange}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
          <img src={this.props.imageUrl} style={{ width: 300, height: 300 }} />
        </Modal>
        <Container>
          <Row>
            <Col className="gutter-row" span={6}>
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
                    <Col className="gutter-row" span={6} key={item._id}>
                      <Card
                        hoverable
                        bodyStyle={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        actions={[
                          <SettingOutlined
                            key="setting"
                            onClick={() => {
                              this.props.StoreChangeVisibleRedactModelAC(true);
                              this.props.StoreSetCurrectIdAC(item._id);
                            }}
                          />,
                          <div
                            className=""
                            onClick={() => {}}
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                          >
                            <ShoppingCartOutlined key="cart" />
                          </div>,
                        ]}
                        style={{
                          width: 250,
                          height: 300,
                          margin: "20px",
                          display: "grid",
                          gridTemplateRows: "auto 1fr auto",
                          gridTemplateColumns: "100%",
                        }}
                        cover={
                          <img
                            style={{ width: "100%", height: 185 }}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                      >
                        <Meta description={item.name} />
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
    currectId: state.storeReducer.currectId,
    visibleCreateModel: state.storeReducer.visibleCreateModel,
    visibleRedactModel: state.storeReducer.visibleRedactModel,
    imageUrl: state.storeReducer.currectInput?.imageUrl,
    nameProduct: state.storeReducer.currectInput?.nameProduct,
    descriprionProduct: state.storeReducer.currectInput?.descriprionProduct,
    storeProducts: state.storeReducer?.storeProducts,
  };
};

export default connect(mapStateToProps, {
  StoreInputAC,
  StoreSetCurrectIdAC,
  StoreChangeVisibleRedactModelAC,
  StoreChangeVisibleCreateModelAC,
  StoreAddProductFetchServerAC,
  StoreLoadProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
  StoreRedactProductFetchServerAC,
})(Store);
