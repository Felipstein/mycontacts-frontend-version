import styled, { css } from 'styled-components';

export default styled.input`

  border: none;
  width: 100%;
  height: 52px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid transparent;
  transition: border-color 0.2s ease-in;
  appearance: none; // Evita o css dos dispositivos mobile (e também desktop) pegar os estilos padrões.

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.dark} !important;
  `}

`;
