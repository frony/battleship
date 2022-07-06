import { useState } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  display: block;
  min-height: 220px;
  align-items: center;
  width: 300px;
`;

const Ship = styled.div`
  margin: 20px 10px;
  border-bottom: chocolate 1px solid;
  width: 200px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
`;

const Square = styled.div`
  min-width: 20px;
  min-height: 20px;
  border: 1px solid #282c34;
  text-align: center;
`;

const shipsDefault = [
  {
    class: 'Carrier',
    size: 5,
    quantity: 1
  },
  {
    class: 'Battleship',
    size: 4,
    quantity: 1
  },
  {
    class: 'Cruiser',
    size: 3,
    quantity: 1
  },
  {
    class: 'Destroyer',
    size: 2,
    quantity: 2
  },
  {
    class: 'Submarine',
    size: 1,
    quantity: 2
  }
];

export const ShipPanel = () => {
  const [ships] = useState(shipsDefault)
  return (
    <Panel>
      <h1>Ships</h1>
      {ships.map((ship, index) => {
        return (
          <Ship key={index}>
            <h3>{ship.class}</h3>
            {Array.from({ length: ship.quantity }, (_, i) => {
              return (
                <RowContainer>
                  {Array.from({ length: ship.size }, (_, i) => <Square />)}
                </RowContainer>
              );
            })}
          </Ship>
        );
      })}
    </Panel>

  );
};
