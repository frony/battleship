import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Spot } from './Spot';

const REPEAT = 10;
const HITS_TO_WIN = 17

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border: #000000 1px solid;
  margin: 20px;
  min-height: 250px;
`;

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  //width: 300px;
  border: 1px solid #282c34;
  //margin: 20px;
  //min-height: 250px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 220px;
  border: red 1px solid;
  align-items: baseline;
  width: 100%;
`;

const Wrapper = styled.div`
  display: block;
  width: 100%;
  margin: auto;
  border: blue 2px solid;
  width: 600px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SquareEmpty = styled.div`
  min-width: 50px;
  min-height: 50px;
  text-align: center;
  //vertical-align: text-top;
`;

const ships = [
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

const shipsPositions = [
  'A,1', 'A,2', 'A,3', 'A,4', 'A,5',
  'E,8', 'F,8', 'G,8', 'H,8',
  'G,3', 'G,4', 'G,5',
  'J,4', 'J,5',
  'J,7', 'J,8',
  'E,2',
  'I,6'
]

export const Battleship = () => {
  const [ hits, setHits ] = useState(0);
  const [ grid, setGrid ] = useState([]);

  const [ rowsArray ] = useState(Array.from({ length: REPEAT }, (_, i) => i + 65));
  const [ colsArray ] = useState(Array.from({ length: REPEAT }, (_, i) => i + 1));

  const increaseHits = () => {
    const updatedHits = hits + 1;
    setHits(updatedHits);

    if (updatedHits >= HITS_TO_WIN) {
      console.log('You Win!!!!');
    }
  }

  const getSquareFromGrid = position => {
    const objIndex = grid.findIndex(( obj => obj.position == position ));
    return grid[objIndex];
  };

  const displayShips = (newGrid) => {
    const updatedGrid = [ ...newGrid ]
    shipsPositions.forEach(pos => {
      const objIndex = updatedGrid.findIndex(( obj => obj.position === pos ));
      updatedGrid[objIndex].status = 1;
    });
    setGrid(updatedGrid);
  };

  useEffect(() => {
    const newGrid = [];
    // const newGrid = {};
    rowsArray.forEach((value, index) => {
      const letter = String.fromCharCode(Number(value));
      for (let i = 0; i < REPEAT; i++) {
        const position = `${ letter },${ i + 1 }`;
        const newSquare = { position, status: 0 };
        newGrid.push(newSquare);
      }
    });
    displayShips(newGrid);
  }, [ setGrid ]);

  return (
    <>
      <Panel>
        <Wrapper>
          <h1>Battleship</h1>

          {/* Row at the top with column numbers*/ }
          <RowContainer>
            <SquareEmpty/>
            { colsArray.map((colHeader, colIndex) => {
              return <SquareEmpty key={ colIndex }>{ colHeader }</SquareEmpty>
            }) }
          </RowContainer>

          { rowsArray.map((rowNumber, index) => {
            const letter = String.fromCharCode(Number(rowNumber));
            return <RowContainer key={ index }>
              {/* Row header letter */ }
              <SquareEmpty key={ letter }>{ letter }</SquareEmpty>
              { colsArray.map((row, i) => {
                const position = `${ letter },${ i + 1 }`;
                return <Spot
                  getSquareFromGrid={ getSquareFromGrid }
                  key={ i }
                  position={ position }
                  increaseHits={ increaseHits }
                />
              }) }
            </RowContainer>
          }) }
        </Wrapper>
      </Panel>
    </>
  );
};
