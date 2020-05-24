# MagicBet - Client

_Lossless Ethereum Betting_

[![Netlify Status](https://api.netlify.com/api/v1/badges/c995206c-1474-44fd-859d-c43c483fbb40/deploy-status)](https://app.netlify.com/sites/magicbet/deploys)

MagicBet is a no loss betting platform, built on the Ethereum ecosystem. It allows users to bet on real life future events and outcomes without risking to lose their stake. 

All stakes accrue interest until the event which is bet on happens. The interest payment is then shared among the winners, and all participants (winners and losers) get their stakes back - thus allowing users to save money in a fun manner. 

This project contains the client code, the Ethereum smart contracts can be found under the following link.

[Corresponding Contracts](https://github.com/BetTogether/MagicBet-Contracts)


## Setup

Given that [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed, clone the repo and then run `npm install` inside the root directory to install the dependencies. 

Now follow the Setup instructions in the Contracts repo (link above), including copying the application binary interface files in the `abis/` folder over here. 

After you deployed the factory contract, grab the address it was deployed to and paste it into `utils/addresses.ts` under the corresponding network and variable name.

## Usage

Run `npm start`

Your browser will now open the platform site.
