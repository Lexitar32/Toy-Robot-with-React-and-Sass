# Toy Robot with react.

## Description

You have a toy robot on a table top. The table top is 5 x 5 unit grid with no obstructions. You can issue commands to your robot so it can roam around the table top. But, be careful, don't let it fall off!

Create an app that allows commands to be issued to the robot. The robot should be prevented from falling off the table top to its destruction.

A failed command should not stop the app, valid commands should be allowed.

The application should discard all commands until a valid `place()` command has been executed.

`0, 0` on the grid should be seen as bottom left.

## To start development server:

- To install dependencies: run `yarn install`
- To start development server: `yarn start`
- Go to `http://localhost:3000/`

## To Check Live Site

- `https://react-toy-robot.netlify.app/`

## Tech Stack used

- React (Functional Components)
- Sass for styling
- Netlify for continous deployment

## React Liraries Installed

- React Icons (`https://react-icons.github.io/react-icons/`)
- Node Sass for compiling the styles (`https://www.npmjs.com/package/node-sass`)
