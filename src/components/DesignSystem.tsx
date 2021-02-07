import baseStyled, { ThemedStyledInterface, createGlobalStyle } from "styled-components";

export const theme = {
  colorOne: {
    main: "#00F1FF",
    text: "#10161A",
  },
  colorTwo: {
    main: "#0161E8",
    text: "#202B33",
  },
  colorThree: {
    main: "#290CFF",
    text: "#FFFFFF",
  },
  colorFour: {
    main: "#9B00E8",
    text: "#FFFFFF",
  },
  colorFive: {
    main: "#FF019A",
    text: "#FFFFFF",
  },
  default: {
    main: "#F5F8FA",
    text: "#394B59",
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto';
    background-color: "#F5F8FA";
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.colorFour.main};
  color: ${(props) => props.theme.colorFour.text};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
`;

export const Content = styled.div`
  padding: 10px;
  margin: 10px;
  margin-top: 20px;
  color: ${(props) => props.theme.default.text};
  border-radius: 5px;
`;

export const Title = styled.h2``;
