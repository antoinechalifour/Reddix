![Reddix Screenshot](http://i.imgur.com/kNOLRKm.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Thanks guys for the amazing work !

# Reddix

Reddix (which is a week end project of mine) is a Reddit client built with React and Redux.

*I am starting this project in order to build a rather big app using trending technologies. Of course any contribution / advice is welcome* 😁

## Features

- [X] Authenticate with your Reddit account
- [X] Get your subscriptions
- [X] Browse any subreddit + hot / new / rising
- [X] (Un)Subscribe to any subreddit
- [X] (Up/Down)vote posts
- [X] Save posts
- [~] Fetch comments (almost there!)
- [X] (Up/Down)vote comments
- [X] Save comments
- [ ] Post comments
- [ ] Submit Links / Posts
- [ ] ... Messaging
- [ ] ... others

## Additional Features

- [ ] Nice design & UX
- [ ] Open links in-app
- [ ] Customization using CSS variables
- [ ] Offline reading
- [ ] Code splitting

## Getting Started

1. Create 1 "installed app" on your [Reddit prefs page](https://www.reddit.com/prefs/apps)
2. Clone the repo `git clone https://github.com/antoinechalifour/Reddix.git`
3. Duplicate .env.sample -> .env.development.local your credentials (see 1.)
4. yarn (or npm install)
5. yarn start (or npm start)

In order to build the project for production, simply run `yarn run build`.

## Technologies & Patterns

*As this project is a side project, I will be using brand news features and APIs such as CSS variables, Flexboxes, the Fetch API,... As such this client will not support older browers.*

This app uses React as a view library and Redux for state management (with React-Redux). I am trying my best to apply best practises and recommended patterns such as Dumb Component (for the view) and Smart Components (for behaviour). 

Async flows and actions are described in Sagas (using Redux-Saga).

CSS is generated using SCSS, using BEM convention.

All these things are tight together using Webpack with a buch of loaders (see ./config/ directory).
