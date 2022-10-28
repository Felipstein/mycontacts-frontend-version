import styled, { css } from 'styled-components';

export const StyledButton = styled.button`

  height: 50px;
  border: none;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  font-size: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  color: #fff;
  border-radius: 5px;
  transition: background 0.15s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light}
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark}
  }

  &[disabled] {
    background: ${({ theme }) => theme.colors.disabled} !important;
    cursor: default !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  ${({ theme, danger }) => danger && css`
    background: ${theme.colors.danger.main};

    &:hover {
      background: ${theme.colors.danger.light}
    }

    &:active {
      background: ${theme.colors.danger.dark}
    }
  `}
`;
