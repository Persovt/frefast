import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Typography, Divider } from "antd";
class Profile extends React.Component<any, any> {
  render() {
    const data = [
      "Racing car sprays burning fuel into crowd.",
      "Japanese princess to wed commoner.",
      "Australian walks 100km after outback crash.",
      "Man charged over missing wedding girl.",
      "Los Angeles battles huge wildfires.",
    ];
    return (
      <>
        <Container>
          <p>Email: {this.props.data.email}</p>
          <p>Id: {this.props.data.userId}</p>
          <p>Role: {this.props.data.role}</p>
          
          <Divider orientation="left">Zakaz</Divider>
          <List

            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
              </List.Item>
            )}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, {})(Profile);
