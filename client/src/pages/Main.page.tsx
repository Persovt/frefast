import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Row, Col, Image } from "antd";

class MainPage extends React.Component {
  render() {
    console.log(window.innerWidth);
    return (
      <>
        <div
          className=""
          style={{
            backgroundImage:
              "url(" + "https://i.postimg.cc/tRx6Swj0/FREFAST.jpg" + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
           
            height: window.innerWidth / 4,
          }}
        ></div>
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(MainPage);
