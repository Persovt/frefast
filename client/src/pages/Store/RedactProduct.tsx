import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Input } from "antd";
import {
  StoreInputAC,
  StoreChangeVisibleRedactModelAC,
  StoreRedactProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
} from "../../state/reducer/store.reducer";

class RedactProduct extends React.Component<any, any> {
  changeHandler = (event: any) => {
    return { value: event.target.value, name: event.target.name };
  };

  uploadFile = (event: any) => {
    event.preventDefault();
    const { files } = event.target;
    const localImageUrl = window.URL.createObjectURL(files[0]);

    this.props.StoreInputAC({ value: localImageUrl, name: "uploadImage" });
  };

  render() {
    return (
      <>
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

          <input type="file" name="uploadfile" onChange={this.uploadFile} />
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
    visibleRedactModel: state.storeReducer.visibleRedactModel,
  };
};

export default connect(mapStateToProps, {
  StoreInputAC,
  StoreChangeVisibleRedactModelAC,
  StoreRedactProductFetchServerAC,
  StoreDeleteProductFetchServerAC,
})(RedactProduct);
