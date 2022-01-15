import React, { Suspense } from "react";
import "./index.scss";

// Importing Components & Libraries
import { FiArrowRight } from "react-icons/fi";
const Grid = React.lazy(() => import('./components/Grid'));

function App() {
  return (
    <Suspense fallback={<div>Pages Loading...</div>}>
      <div className="page-header-cont">
        <h1 className="page-header">Toy Robot App 🎉</h1>
      </div>
      <div className="page-content">
        <div className="description">
          <h1 className="description-header">How to operate the robot 😎</h1>
          <p><FiArrowRight /> Place(x, y, facing): `x` and `y` are integers that relate to a location on the grid. Values that are outside the boundary of the grid should not be allowed. `facing` is a string referencing the direction the robot is facing. Values `NORTH`, `SOUTH`, `EAST` or `WEST` are allowed.</p>
          <p><FiArrowRight /> Move: Moves the robot 1 grid unit in the direction it is facing unless that movement will cause the robot to fall off the grid.</p>
          <p><FiArrowRight /> Left: Rotate the robot 90° anticlockwise/counterclockwise.</p>
          <p><FiArrowRight /> Right: Rotate the robot 90° clockwise.</p>
          <p><FiArrowRight /> Report - Outputs the robot's current grid location and facing direction.</p>
        </div>
        <div className="grid-container">
          <Grid />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
