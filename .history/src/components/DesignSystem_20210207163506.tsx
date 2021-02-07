import baseStyled, { ThemedStyledInterface } from "styled-components";

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
    text: "#202B33",
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${theme.colorFour.main};
`;

export const Content = styled.div`
  background-color: ${theme.default.main};
  padding: 10px;
  margin: 10px;
  color: ${theme.default.text};
`;
