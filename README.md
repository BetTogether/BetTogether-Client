<h1 align="center">
  <span role="img" aria-label="tophat">
    🎩
  </span>
  MagicBet - Client
</h1>
<h2 align="center">Loseless Ethereum Betting</h2>

<p align="center">
    <a href="https://BetTogether.github.io/MagicBet-Client/">
    <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg" alt="Storybook" />
    </a>
    <a href="https://app.netlify.com/sites/magicbet/deploys">
    <img src="https://api.netlify.com/api/v1/badges/c995206c-1474-44fd-859d-c43c483fbb40/deploy-status" alt="Netlify" />
    </a>
</p>

<br/>

MagicBet is a lossless, Ethereum-based betting platform, utilizing core DeFi infrastructure found within the Ethereum ecosystem. By allowing users to make money market predictions using solely their generated interest rates, more can experience the benefits of a decentralized technology.

All stakes accrue interest until the event which is bet on occurs. The interest payment is then shared among the winners, and all participants (winners and losers) get their stakes back - thus saving money in a fun manner.

[Corresponding Contracts](https://github.com/BetTogether/MagicBet-Contracts)

## Setup

Given that [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed, clone the repo and then run `npm install` inside the root directory to install the dependencies.

Now follow the Setup instructions in the Contracts repo (link above), including copying the application binary interface files in the `abis/` folder, and take a note of the address of the deployed BTMarketFactory.sol, and update the relevant variable in src/utils/addresses.ts (line 6 for kovan).

## Start local server

Run `npm start`

Your browser will now open the platform site.

## How to use the app

Originally, only a factory contract will be deployed. To deploy a market, click 'Create Market' in the dashboard tab.

You will be given a set of options to complete. They are pre-filled with a sample market (November 2020 US Election).

- Event name: self-explanatory
- Realit.io question: this is the string that is passed to the oracle when the market contract is deployed. It is in a specific format, as outlined in the realit.io documentation
- Arbitrator: who ultimately decides the outcome in the case of continued disputes
- Opening: the timestamp when betting opens
- Locking: the timestamp when betting ends
- Resolution: the timestamp of when the event itself occurs, sent to the oracle
- Timeout: Sent to the oracle, = how many seconds the oracle waits for a dispute, before finalizing an answer
- Outcomes: this is an array of strings, with each outcome name. This variable is also used to name the ERC20 token for each outcome.

After a market is created, it will be in the 'WAITING' state. The state must be incremented before it will move to the OPEN state, which can be achieved by selecting 'increment state'. Note that this tx will revert if the Opening timestamp is in the future.

The market is Ownable, and only the owner can increment state. The owner is whoever created the market.

Once the market is in the OPEN state, you are free to make bets, by selecting the outcome you wish to bet on and pressing 'Enter'.

To conclude the event, first change the state to LOCKED, again by selecting 'increment state'. This tx will revert if the Locking timestamp is in the future.

At this point, the contract needs to know who won the event. This is achieved by selecting 'determine winner' at which point the contract will ask the Oracle if the event has resolved, and if so, who won. If the event has not yet resolved, the tx will not revert, but it will not change the state, and will have to be called again. If the market has resolved, calling this function will take note of the winner, and move the contract to the WITHDRAW state.

For testing purposes, the oracle can be resolved by visiting [Realit.io](https://realitio.github.io/) (for Kovan), selecting the event, and submitting the correct answer. This is only possible if the Resolution timestamp is in the past. After submitting a correct answer, you must wait until Timeout seconds have passed, before it is finalized.

Once the contract is in the withdraw state, a WITHDRAW button will appear. Selecting this will always return your original bet, if you bet on the winning outcome it will also send you your share of the accumulated interest.
