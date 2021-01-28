import React from "react";
import { connect } from "react-redux";
import { Card, Button, Input } from "antd";
import { BsPlusCircle } from "react-icons/bs";
import {
  SettingOutlined,
  UploadOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import {
  inputReducer,
  AddNewProductServerAC,
  SetProductsFetchServerAC,
  DeleteProductsFetchServerAC,
  RedactProductsFetchServerAC,
} from "../state/auth.reducer";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Container } from "react-bootstrap";
const { Meta } = Card;

class Store extends React.Component<any, any> {
  componentDidMount() {
    this.props.SetProductsFetchServerAC();
  }

  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  showModal = () => {
    console.log("show");
    this.setState({ isModalVisibleCreateProduct: true });
  };

  handleOkCreateProduct = () => {
    this.props.AddNewProductServerAC({
      imageUrl: this.props.imageUrl,
      nameProduct: this.props.nameProduct,
      descriprionProduct: this.props.descriprionProduct,
    });
    this.setState({ isModalVisibleCreateProduct: false });
  };
  handleDeleteRedactProduct = () => {
    console.log(this.state.currectId);
    this.props.DeleteProductsFetchServerAC({
      currectId: this.state.currectId,
    });
    this.setState({ isModalVisibleRedactProduct: false });
  };

  handleRedactProduct = () => {
    this.props.RedactProductsFetchServerAC({
      imageUrl: this.props.imageUrl,
      nameProduct: this.props.nameProduct,
      descriprionProduct: this.props.descriprionProduct,
      id: this.state.currectId,
    });

    this.setState({ isModalVisibleRedactProduct: false });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  constructor(props: any) {
    super(props);
  }
  state = {
    loading: false,
    imageUrl: "",
    isModalVisibleCreateProduct: false,
    isModalVisibleRedactProduct: false,
    currectId: "",
  };

  getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = (info: any) => {
    console.log(info);
    this.getBase64(info.file.originFileObj, (imageUrl: any) => {
      this.props.inputReducer({ value: imageUrl, name: "imageUrl" });
    });
  };

  beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Only upload JPG or PNG files!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image size must be less than 2MB!");
      return false;
    }
    return isJpgOrPng && isLt2M;
  }
  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Modal
          title="Create new product"
          visible={this.state.isModalVisibleCreateProduct}
          onOk={this.handleOkCreateProduct}
          onCancel={() => this.setState({ isModalVisibleCreateProduct: false })}
        >
          <Input
            placeholder="name product"
            name="nameProduct"
            onChange={(e: any) =>
              this.props.inputReducer(this.changeHandler(e))
            }
          />

          <Input
            placeholder="description product"
            name="descriprionProduct"
            onChange={(e: any) =>
              this.props.inputReducer(this.changeHandler(e))
            }
          />

          <Upload
            onChange={this.handleChange}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <img src={this.state.imageUrl} style={{ width: 300, height: 300 }} />
        </Modal>
        <Modal
          title="Redact product"
          visible={this.state.isModalVisibleRedactProduct}
          footer={
            <>
              <Button danger onClick={this.handleDeleteRedactProduct}>
                DELE VSE NAXY
              </Button>
              <Button type="primary" onClick={this.handleRedactProduct}>
                Ok
              </Button>
              <Button
                onClick={() =>
                  this.setState({ isModalVisibleRedactProduct: false })
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
              this.props.inputReducer(this.changeHandler(e))
            }
          />

          <Input
            placeholder="description product"
            name="descriprionProduct"
            onChange={(e: any) =>
              this.props.inputReducer(this.changeHandler(e))
            }
          />

          <Upload
            onChange={this.handleChange}
            showUploadList={false}
            beforeUpload={this.beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <img src={this.state.imageUrl} style={{ width: 300, height: 300 }} />
        </Modal>
        <Container>
          <Row>
            <Col className="gutter-row" span={6}>
              <Card
                onClick={() =>
                  this.setState({ isModalVisibleCreateProduct: true })
                }
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

            {this.props.storeProducts.length
              ? this.props.storeProducts.map((item: any, index: any) => {
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
                            onClick={() =>
                              this.setState({
                                currectId: item._id,
                                isModalVisibleRedactProduct: true,
                              })
                            }
                          />,
                          <ShoppingCartOutlined key="cart" />,
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
    imageUrl: state.currectInput.imageUrl,
    nameProduct: state.currectInput.nameProduct,
    descriprionProduct: state.currectInput.descriprionProduct,
    storeProducts: state?.storeProducts,
  };
};

export default connect(mapStateToProps, {
  inputReducer,
  RedactProductsFetchServerAC,
  AddNewProductServerAC,
  SetProductsFetchServerAC,
  DeleteProductsFetchServerAC,
})(Store);
