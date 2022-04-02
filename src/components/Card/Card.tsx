import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  flex: 1;
  border: 1px solid black;
  border-radius: 25px;
  background-image: linear-gradient(1turn,rgba(30,0,56,.8),#16002c);
  color: wheat;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Card;
