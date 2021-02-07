import * as React from "react";
import { Content, Header, Title } from "components";
import Todo from "./Todo";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header>
        <Title>Todo</Title>
      </Header>
      <Content>
        <Todo />
      </Content>
    </React.Fragment>
  );
};

export default Home;
