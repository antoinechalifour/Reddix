![Build Status](https://travis-ci.org/antoinechalifour/Reddix.svg?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Reddix Screenshot](http://i.imgur.com/2SXSIcd.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Thanks guys for the amazing work!

# Reddix

Reddix (which is a week end project of mine) is a Reddit client built with React and Redux. My main goal is to explore modern technologies by creating a real-world project. 

To keep an eye on the Project status, [click here](https://github.com/antoinechalifour/Reddix/projects/1).

*Anybody wishing to learn stuff together can join me by forking this project and sending pull requests or issues!* 😁

## Getting Started

1. Create an "installed app" on your [Reddit prefs page](https://www.reddit.com/prefs/apps)
2. Clone this repo `git clone https://github.com/antoinechalifour/Reddix.git`
3. Duplicate .env.sample into .env.development.local and add your credentials (see 1.)
4. yarn (or npm install)
5. yarn start (or npm start)
6. ???
7. Profit (or go to http://localhost:3000)

In order to build the project for production:

```
REACT_APP_CLIENT_ID=<your client id> REACT_APP_OAUTH_REDIRECT_URL=<your redirect url> yarn build
```

## Tech

Here is a non-exhaustive list of the things that I use / apply:

* [Reddit API](https://www.reddit.com/dev/api/)
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [React](https://facebook.github.io/react/)
* [Redux](http://redux.js.org/)
* [Redux-Saga](https://redux-saga.js.org/)
* [Reselect](https://github.com/reactjs/reselect)
* [React-Router v4](https://reacttraining.com/react-router/web/guides/quick-start)
* [Webpack 2](http://webpack.github.io/docs/)
* [Smart & Dumbs Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [Styled-Components](https://www.styled-components.com/)
* [StandardJS](https://standardjs.com/)
* ["Scene-Oriented Architecture"](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)

Bonus:

* [Travis CI](https://travis-ci.org/)
* [Netlify](https://www.netlify.com/)
