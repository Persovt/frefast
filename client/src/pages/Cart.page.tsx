import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { List, Avatar,Divider } from 'antd';

class Cart extends React.Component<any, any> {
  render() {
    const data = [
      {
        title: "Ant Design Title 1",
      },
      {
        title: "Ant Design Title 2",
      },
      {
        title: "Ant Design Title 3",
      },
      {
        title: "Ant Design Title 4",
      },
    ];

    return (
      <>
        <Container>
        <Divider orientation="left">Карзина</Divider>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, {
 
})(Cart);
