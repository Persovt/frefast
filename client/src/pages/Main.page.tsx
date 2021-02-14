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

        <form
          name="payment"
          method="post"
          action="https://sci.interkassa.com/"
          accept-charset="UTF-8"
        >
          <input
            type="hidden"
            name="ik_co_id"
            value="60291454b33a4b09f87a4c57"
          />
          <input type="hidden" name="ik_pm_no" value="ID_4233" />
          <input type="hidden" name="ik_am" value="10" />
          <input type="hidden" name="ik_cur" value="RUB" />
          <input type="hidden" name="ik_desc" value="Payment Description" />
          <input type="submit" value="Pay" />
        </form>
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(MainPage);
