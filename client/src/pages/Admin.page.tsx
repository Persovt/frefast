import React from "react";
import { connect } from "react-redux";
import { List, message, Avatar } from "antd";
import { Container } from "react-bootstrap";

class Admin extends React.Component<any, any> {
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
    let data = [{ name: "hi" }, { name: "hi2" }];
    return (
      <>
        <Container>
          <div className="demo-infinite-container">
            <h4>Заказы:</h4>
            <List
              dataSource={data}
              renderItem={(item: any) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
                    //description={item.name}
                  />
                  <div className="">{item.name}</div>
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
  };
};

export default connect(mapStateToProps, {})(Admin);
