import React from "react";
import { connect } from "react-redux";
import { List, message, Avatar } from "antd";
import { Container } from "react-bootstrap";
import {OrderLoadFetchServerAC} from '../state/reducer/order.reducer'

class Admin extends React.Component<any, any> {
  componentDidMount(){
    this.props.OrderLoadFetchServerAC()
  }
  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };

  render() {
    
    return (
      <>
        <Container>
          <div className="demo-infinite-container">
            <h4>Заказы:</h4>
            <List
              dataSource={this.props.order}
              renderItem={(item: any) => (
                <List.Item key={item._id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{}</a>}
                    //description={item.name}
                  />
                  <p className="">Adres: {item.data.adres} </p>
                  <p className="">City: {item.data.city} </p>
                  <p className="">Index: {item.data.index} </p>
                  <p className="">Street: {item.data.street} </p>
                  <p className="">Status: {item.status} </p>
                </List.Item>
              )}
            ></List>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    data: state.authReducer.data,
    order: state.orderReducer.orders
  };
};

export default connect(mapStateToProps, {
  OrderLoadFetchServerAC,

})(Admin);
