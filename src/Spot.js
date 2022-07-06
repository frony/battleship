import { useState } from 'react';
import styled from 'styled-components';

const Square = styled.div`
  min-width: 50px;
  min-height: 50px;
  border: 1px solid #61dafb;
  text-align: center;
`;

const SquareHit = styled.div`
  background-color: #babaca;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: block;
  width: 100%;
  margin: auto;
`;

export const Spot = ({ position, getSquareFromGrid, increaseHits }) => {
  const [ missed, setMissed ] = useState(false);
  const [ hit, setHit ] = useState(false);

  const fireTorpedo = () => {
    const square = getSquareFromGrid(position);
    const { status } = square;
    if (status !== 0) {
      setHit(true);
      increaseHits();
    } else {
      setMissed(true);
    }
  }

  return <Square onClick={ () => fireTorpedo(position) }>
    { hit && <SquareHit/> }
    { missed && <Wrapper><p>{ 'X' }</p></Wrapper> }
  </Square>
};
