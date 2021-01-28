import React from "react";
import { connect } from "react-redux";

class MainPage extends React.Component {
  render() {
    return (
      <>
        <div className="">Main</div>
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {})(MainPage);
