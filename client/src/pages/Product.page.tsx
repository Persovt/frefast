import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Row, Col, Image } from "antd";

class ProductPage extends React.Component {
  render() {
    return (
      <>
       
          <Row>
            <Col span={24}>
              <img
                style={{
                  width: 795,
                  height: 200,
                }}
                src="https://i.postimg.cc/tRx6Swj0/FREFAST.jpg"
                alt=""
              />
            </Col>
          </Row>
        
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {
    
})(ProductPage);
