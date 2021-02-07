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
    background-color: #F5F8FA;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.default.text};
  border-radius: 5px;
`;

interface CardProps {
  width: string;
}

export const Card = styled.div<CardProps>`
  border-radius: 5px;
  margin: 6px;
  padding: 10px;
  width: ${({ width }) => width};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  background-color: #ffffff;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  font-size: 28px;
  border: 0.5px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  outline: none !important;
  color: inherit;
  &:active {
  }
`;

interface InputProps {
  width: string;
}

export const Input = styled.input<InputProps>`
  font-size: 28px;
  height: 60px;
  background: ${({ theme }) => theme.default.main};
  border: none;
  width: ${({ width }) => width};
  border-radius: 5px;
  ::placeholder {
    color: ${({ theme }) => theme.colorFive.main};
  }
`;

interface BoxProps {
  width: string;
}

export const Box = styled.div<BoxProps>`
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 5px;
  width: ${({ width }) => width};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colorFour.main};
`;

export const TextArea = styled.textarea`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: ${({ theme }) => theme.default.main};
  border: none;
  border-radius: 5px;
  ::placeholder {
    color: ${({ theme }) => theme.colorFive.main};
  }
`;

export const Title = styled.h2`
  font-weight: normal;
`;
export const ErrorText = styled.p`
  color: red;
`;
