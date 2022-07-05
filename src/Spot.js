import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Square = styled.div`
  min-width: 50px;
  min-height: 50px;
  border: 1px solid #61dafb;
  text-align: center;
  //vertical-align: text-top;
`;

const SquareHit = styled.div`
  background-color: #babaca;
  width: 100%;
  height: 100%;
`;

export const Spot = ({ position, getSquareFromGrid, updateGrid }) => {
  const [ isClicked, setIsClicked ] = useState(false);
  const [isHit, setIsHit] = useState(false);

  const fireTorpedo = () => {
    const square = getSquareFromGrid(position);
    console.log('position', position);
    console.log('square', square);
    const { status } = square;
    console.log('status', status);
    if (status !== 0) {
      setIsHit(true);
    } else {
      setIsClicked(true);
    }
  }

  return <Square onClick={ () => fireTorpedo(position) }>
    { isHit && <SquareHit />}
    { isClicked && 'X' }
  </Square>
};
