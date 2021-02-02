import React from "react";
import { connect } from "react-redux";
import { Modal, Input } from "antd";
import {
  StoreInputAC,
  StoreAddProductFetchServerAC,
  StoreChangeVisibleCreateModelAC,
} from "../../state/reducer/store.reducer";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class CreateProduct extends React.Component<any, any> {
  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  uploadFile = (event: any) => {
    // if (info.file.status === "done")
    event.preventDefault();
    const { files } = event.target;
    const localImageUrl = window.URL.createObjectURL(files[0]);

    this.props.StoreInputAC({ value: localImageUrl, name: "uploadImage" });
  };

  render() {
    return (
      <>
      
        <Modal
          title="Create new product"
          visible={this.props.visibleCreateModel}
          onOk={() =>
            this.props.StoreAddProductFetchServerAC({
              uploadImage: this.props.uploadImage,
              nameProduct: this.props.nameProduct,
              descriprionProduct: this.props.descriprionProduct,
              amountProduct: this.props.amountProduct,
              priceProduct: this.props.priceProduct,
              typeProduct: this.props.typeProduct,
            })
          }
          onCancel={() => this.props.StoreChangeVisibleCreateModelAC(false)}
        >
          <Tabs defaultActiveKey="product"  onChange={(key: any) => this.props.StoreInputAC({ value: key, name: "typeProduct" })}>
            <TabPane tab="Product" key="product">
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
              <Input
                type="number"
                placeholder="price product"
                name="price"
                onChange={(e: any) =>
                  this.props.StoreInputAC(this.changeHandler(e))
                }
              />
              <Input
                type="number"
                placeholder="amount product"
                name="amount"
                onChange={(e: any) =>
                  this.props.StoreInputAC(this.changeHandler(e))
                }
              />

              <input type="file" name="uploadfile" onChange={this.uploadFile} />
            </TabPane>
            <TabPane tab="Site" key="site">
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
              <Input
                type="number"
                placeholder="price product"
                name="price"
                onChange={(e: any) =>
                  this.props.StoreInputAC(this.changeHandler(e))
                }
              />
              <Input
                type="number"
                placeholder="amount product"
                name="amount"
                onChange={(e: any) =>
                  this.props.StoreInputAC(this.changeHandler(e))
                }
              />

              <input type="file" name="uploadfile" onChange={this.uploadFile} />
            </TabPane>
          </Tabs>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    descriprionProduct: state.storeReducer.currectInput?.descriprionProduct,
    visibleCreateModel: state.storeReducer.visibleCreateModel,
    uploadImage: state.storeReducer.currectInput?.uploadImage,
    amountProduct: state.storeReducer.currectInput?.amount,
    priceProduct: state.storeReducer.currectInput?.price,
    nameProduct: state.storeReducer.currectInput?.nameProduct,
    typeProduct: state.storeReducer.currectInput?.typeProduct,
  };
};

export default connect(mapStateToProps, {
  StoreInputAC,
  StoreChangeVisibleCreateModelAC,
  StoreAddProductFetchServerAC,
})(CreateProduct);
