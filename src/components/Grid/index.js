import React, { useState } from 'react';

// Importing Styles
import './index.scss';

// Importing Components
import GridTile from '../GridTile';
import Select from '../Select';
import Button from '../Button';
import ReportMessage from '../ReportMessage';

// A 5X5 Grid System (i.e Width and Height is 5)
const MainGridWidth = 5;
const MainGridHeight = 5;

// Starting from a value of 0, the Max value of Y and X is 4 (5 - 1) and their minimum value is 0
const MaxYValue = MainGridHeight - 1;
const MinYValue = 0;

const MaxXValue = MainGridWidth - 1;
const MinXValue = 0;

// The Coordinates of the Grid system showing the minimum and maximum value
const BOARD_COORDINATES_OPTIONS = [
  { title: '0', value: 0 },
  { title: '1', value: 1 },
  { title: '2', value: 2 },
  { title: '3', value: 3 },
  { title: '4', value: 4 }
];

// The four possible rotation value
const ROBOT_ROTATION_OPTIONS = [
  { title: 'south', value: 'SOUTH' },
  { title: 'north', value: 'NORTH' },
  { title: 'east', value: 'EAST' },
  { title: 'west', value: 'WEST' }
];

const ROBOT_DIRECTION_MAP = {
  NORTH: {
    RIGHT: 'EAST',
    LEFT: 'WEST',
  },
  EAST: {
    RIGHT: 'SOUTH',
    LEFT: 'NORTH',
  },
  SOUTH: {
    RIGHT: 'WEST',
    LEFT: 'EAST',
  },
  WEST: {
    RIGHT: 'NORTH',
    LEFT: 'SOUTH',
  },
};

// The pattern of the grid
const BOARD_MATRIX = new Array(MainGridWidth).fill(0).map(() => new Array(MainGridHeight).fill(0));

const Grid = () => {
  // Declaring of States
  const [robotPosX, setrobotPosX] = useState(0); // Position X state
  const [robotPosY, setrobotPosY] = useState(0); // Position Y state
  const [robotDirection, setrobotDirection] = useState('SOUTH'); // Direction State
  const [shouldPlace, setshouldPlace] = useState(false); // State to determine when to place the robot
  const [shouldReport, setshouldReport] = useState(false); // State to determine when to report the current direction of the robot
  const [reportMessage, setreportMessage] = useState(null); // The report message

  // Function to get position
  const positionFunc = (e) => {
    const value = parseInt(e.target.value, 10);

    setshouldPlace(false);
    setrobotPosX(value);
    setrobotPosY(value);
  }

  // Function to get the direction
  const directionFunc = (e) => {
    const value = e.target.value;
    setshouldPlace(false);
    setrobotDirection(value);
  }

  // Function to place the robot on the grid
  const placeFunc = () => {
    setshouldPlace(true);
    setshouldReport(false);
  }

  // Function to rotate the robot in the left or right direction
  const rotateFunc = (e) => {
    const turnValue = e.target.value;
    const currentRobotDirection = robotDirection;
    const newRobotDirection = ROBOT_DIRECTION_MAP[currentRobotDirection][turnValue];

    setrobotDirection(newRobotDirection);
    setshouldReport(false);
  }

  // Function to move the robot forward
  const moveFunc = () => {
    const direction = robotDirection;
    switch (direction) {
      case 'NORTH':
        setrobotPosY(robotPosY < MaxYValue ? robotPosY + 1 : robotPosY)
        setshouldReport(false);
        break;
      case 'EAST':
        setrobotPosX(robotPosX < MaxXValue ? robotPosX + 1 : robotPosX)
        setshouldReport(false);
        break;
      case 'SOUTH':
        setrobotPosY(robotPosY > MinYValue ? robotPosY - 1 : robotPosY)
        setshouldReport(false);
        break;
      case 'WEST':
        setrobotPosX(robotPosX > MinXValue ? robotPosX - 1 : robotPosX)
        setshouldReport(false);
        break;
      default:
        alert("no valid direction")
    }
  }

  // Function to report the location of the robot on the grid
  const handleReportClick = () => {
    if (!shouldPlace) {
      return;
    }
    const newReportMessage = `
    Robot is currently in position x: ${robotPosX},
     position y: ${robotPosY}, facing: ${robotDirection}`;

    setshouldReport(true);
    setreportMessage(newReportMessage);
  }

  // Render the column when the robot is placed
  const renderColumn = (column, index, robotPosY, robotPosX, robotDirection) => {
    return (
      <div key={index} style={{ transform: 'rotate(180deg)' }} role="row">
        {
          column.map((_, index) => {
            if (robotPosY === index) {
              return <GridTile key={index} show={true} direction={robotDirection} />;
            }

            return <GridTile key={index} show={false} />;
          })
        }
      </div>
    );
  }

  // Render empty colum when the grid is not placed yet
  const renderEmptyColumn = (column, index) => {
    return (
      <div key={index} style={{ transform: 'rotate(180deg)' }} role="row">
        {
          column.map((_, index) => {
            return <GridTile key={index} show={false} />;
          })
        }
      </div>
    );
  }

  // Display emtpty grid initially
  const renderEmptyGrid = () => {
    return BOARD_MATRIX.map((column, index) => renderEmptyColumn(column, index));
  }

  return (
    <main className="board-main">
      <div className="flex-grid board-main__searchbar" role="search">
        {/* Field for Position X */}
        <Select
          label="position x"
          name="robotPosX"
          options={BOARD_COORDINATES_OPTIONS}
          onBlur={(e) => positionFunc(e)}
        />

        {/* Field for Position y */}
        <Select
          label="position y"
          name="robotPosY"
          options={BOARD_COORDINATES_OPTIONS}
          onBlur={(e) => positionFunc(e)}
        />

        {/* Field for Direction */}
        <Select
          label="Facing"
          name="robotDirection"
          options={ROBOT_ROTATION_OPTIONS}
          onBlur={(e) => directionFunc(e)}
        />

        {/* Button to Place the robot */}
        <Button onClick={() => placeFunc()} label="Place" />

        {/* Button to rotate to the left or right */}
        <Button value="RIGHT" onClick={(e) => rotateFunc(e)} label="Right" />
        <Button value="LEFT" onClick={(e) => rotateFunc(e)} label="Left" />

        {/* Button to move */}
        <Button onClick={() => moveFunc()} label="move" />

        {/* Button to generate report */}
        <Button onClick={() => handleReportClick()} label="Generate report" />

        {/* Report Message */}
        {shouldReport && <ReportMessage text={reportMessage} />}
      </div>

      <div className="flex-grid-fifth" role="grid" aria-labelledby="grid-title">
        {/* Show empty grid initially */}
        {!shouldPlace && BOARD_MATRIX.length > 0 && renderEmptyGrid()}

        {/* Display grid with columns if the place button is clicked */}
        {shouldPlace && BOARD_MATRIX.length > 0 &&
          BOARD_MATRIX.map((column, index) => {
            if (robotPosX === index) {
              return renderColumn(column, index, robotPosY, robotPosX, robotDirection);
            } else {
              return renderEmptyColumn(column, index);
            }
          })
        }
      </div>
    </main>
  );
}

export default Grid;
