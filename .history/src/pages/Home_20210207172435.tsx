import * as React from "react";
import { Content, Header, Title } from "components";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header>
        <Title>Todo Application</Title>
      </Header>
      <Content>
        <h1>Hello</h1>
      </Content>
    </React.Fragment>
  );
};

export default Home;
