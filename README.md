# React Crypto Order Book App

## Description

**Crypto order book app** is a ledger containing all outstanding orders – instructions from traders to buy or sell currency. An order to buy is called a `bid` and an order to sell is called an `ask.` Bids and asks are paired up as soon as their requirements are fulfilled, resulting in a trade.

## Table of Contents

- [Description](#description)
- [Setup](#setup)
  - [Dependencies](#dependencies)
  - [Getting Started](#getting-started)
- [Prototype](#prototype)
- [Deployment](#deployment)


## Setup

### Dependencies

List of libraries, tools, etc needed (e.g. npm, yarn, etc)

- [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces
- [SemanticUI](https://react.semantic-ui.com/) - Semantic UI React is the official React integration for Semantic UI
- A package manager - [yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)
- [Bitstamp API for trading pairs]( https://www.bitstamp.net/api/v2/trading-pairs-info/) - Bitstamp provides reliable trading of cryptocurrencies.
- [Bitstamp streaming API](https://www.bitstamp.net/websocket/v2/) - Bitstamp streaming API

### Getting Started

- Clone the repo - `git clone https://github.com/McHardex/react-crypto.git`
- Change into the project directory - `cd react-crypto`
- Install project dependencies run `npm install`
- Run the server `npm start` or `yarn start`

## Prototype

The application is staged [here](https://crypro-order-book.netlify.com/)

## Deployment

This is a one-page application so Deployment in this project happens via Netlify when a PR has been successfully merged to master.
