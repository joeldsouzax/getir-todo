import styled from "styled-components";

export const theme = {
  colorOne: {
    main: "#00F1FF",
    text: "#000000",
  },
  colorTwo: {
    main: "#0161E8",
    text: "#000000",
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
};

export const Header = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${theme.colorOne.main};
`;
