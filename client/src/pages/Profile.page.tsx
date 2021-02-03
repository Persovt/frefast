import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Typography, Divider } from "antd";
import { Avatar, Collapse } from "antd";
import { OrderLoadFetchServerAC } from "../state/reducer/order.reducer";

const { Panel } = Collapse;
class Profile extends React.Component<any, any> {
  componentDidMount() {
    this.props.OrderLoadFetchServerAC();
  }
  render() {
    return (
      <>
        <Container>
          <p>Email: {this.props.data.email}</p>
          <p>Id: {this.props.data.userId}</p>
          <p>Role: {this.props.data.role}</p>

          <Divider orientation="left">Зыказы:</Divider>
          <Collapse defaultActiveKey={["0"]}>
            {this.props.order.map((item: any, index: number) => {
              console.log(item)
              if (item.userId === this.props.data.userId)
                return (
                  <Panel
                    header={item._id + "  Status:  " + item.status}
                    key={index}
                  >
                    <p className="">Adres: {item.data.adres} </p>
                    <p className="">City: {item.data.city} </p>
                    <p className="">Index: {item.data.index} </p>
                    <p className="">Street: {item.data.street} </p>

                    <h5>Товары:</h5>

                    <List
                      dataSource={item.products}
                      renderItem={(item: any) => (
                        <List.Item key={item._id}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.img} />}
                            title={<a href="#">{item.name}</a>}
                            description={item.description}
                          />
                          <p className="">
                            Price: {item.price ? item.price : "free"}{" "}
                          </p>
                          <p className="">Amount: {item.amount} </p>
                        </List.Item>
                      )}
                    ></List>
                  </Panel>
                );
            })}
          </Collapse>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state.authReducer.data,
    order: state.orderReducer?.orders,
  };
};

export default connect(mapStateToProps, {
  OrderLoadFetchServerAC,
})(Profile);
