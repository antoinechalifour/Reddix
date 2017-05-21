![Reddix Screenshot](http://i.imgur.com/kNOLRKm.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Thanks guys for the amazing work !

# Reddix

Reddix (which is a week end project of mine) is a Reddit client built with React and Redux.

**You are welcome to send your Pull Request and other contributions ❤️**

## Current Features

My main goal for now is to integrate native Reddit features but more is comming 😁

* Browse any subreddit and posts
* Authenticate and browse your subscriptions

## Todo list

* Design
* Customization using CSS variables
* Integrate PWA features (service workers,...)
* SSR ?
* Code splitting
* Other Reddit features (submit content, link, coments,...)

## Getting Started

* clone the repo
* yarn (or npm install)
* yarn start (or npm start)

**/!\ Build scripts are not ready yet**

## Technologies & Patterns

*As this project is a side project, I will be using brand news features and APIs such as CSS variables, Flexboxes, the Fetch API,... As such this client will not support older browers.*

This app uses React as a view library and Redux for state management (with React / Redux). I am trying my best to use best practises and current patterns such as Dumb Component (for the view) and Smart Components (for behaviour). 

Async flows and actions are described in Sagas (using Redux-Saga).

CSS is generated using SCSS, using the BEM notation.

All these things are tight together using Webpack and a buch of loaders (see ./config/ directory).