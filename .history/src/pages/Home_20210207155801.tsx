import * as React from "react";
import { Content, Header } from "components";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header></Header>
      <Content>
        <h1>Hello</h1>
      </Content>
    </React.Fragment>
  );
};

export default Home;
