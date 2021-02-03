import React from "react";
import { connect } from "react-redux";
import { List, message, Avatar, Collapse } from "antd";
import { Container } from "react-bootstrap";
import { OrderLoadFetchServerAC } from "../state/reducer/order.reducer";

const { Panel } = Collapse;
class Admin extends React.Component<any, any> {
  componentDidMount() {
    this.props.OrderLoadFetchServerAC();
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
  callback(key: any) {
    console.log(key);
  }
  render() {
    console.log(this.props.order);
    return (
      <>
        <Container>
          <div className="demo-infinite-container">
            <h4>Заказы:</h4>
            <Collapse defaultActiveKey={["0"]} onChange={this.callback}>
              {this.props.order.map((item: any, index: number) => {
                return (
                  <Panel header={item._id + "  Status:  " + item.status} key={index}>
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
                              avatar={
                                <Avatar src={item.img} />
                              }
                              title={<a href="#">{item.name}</a>}
                              description={item.description}
                            />
                            <p className="">Price: {item.price ? item.price : 'free'} </p>
                            <p className="">Amount: {item.amount} </p>
          
                          </List.Item>
                        )}
                      ></List>
                    
                  </Panel>
                );
              })}
            </Collapse>

            {/* <List
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
            ></List> */}
          </div>
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
})(Admin);
