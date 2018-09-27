# The Community Mind

This is a PoC project to attemt to create an ethereum based smart contract backend for [TheCommunityMind](www.thecommunitymind.com).
The repo for the current project can be found [here](https://github.com/wip-abramson/TheCommunityMind)

## Vision

My vision for this project is explained in this [article](www.misterwip.uk/thecommunitymind).



## Technologies

This project uses a number of different technologies that I am exploring in order to achieve my goal.

* Solidity - The language used to develop smart contracts for the Ethereum network
* [Truffle](https://truffleframework.com/) - a suite of tools used to compile and develop smart contracts in Ethereum. These incude:
  * [Drizzle](https://truffleframework.com/drizzle) - Enables redux like interfacing with smart contracts
  * [Ganache](https://truffleframework.com/ganache) - A one click blockchain for test purposes
* [TheGraph](https://thegraph.com/) - Used to index events and enables queries of these events using [GraphQl](https://graphql.org/)
* React - Frontend will be written using react
* [Apollo](https://www.apollographql.com/) - A connector used to wrap graphql queries in React components and inject responses as props

## Set Up 

### Pre Installation

This project can be run locally but requires some quite complicated pre installations.

1. Install Ganache - This is for your local development blockchain

2. Install [TheGraph node](https://github.com/graphprotocol/graph-node) and dependencies - see Quick Start section

3. Clone the repo

```
git clone https://github.com/Blockternship/TheCommunityMind.git
```

4. Install packages 
```
cd TheCommunityMind
npm install
cd mind-subgraph
npm install
cd ../client
npm install
```

### Build and migrate contracts in the main fo

5. Start up Ganache

6. In the main folder TheCommunityMind compile and migrate contracts
```
truffle compile
truffle migrate
``` 

### Deploying The Graph Subgraph
7. Install modules in mind-subgraph folder
```
cd mind-subgraph
npm install
```

8. Start IPFS in a fresh terminal
```
ipfs daemon
```

9. Copy the address of the migtrated TheMind contract (should be printed to terminal) to the subgraph.yaml file under:
```
dataSources:
- kind: ethereum/contract
  name: TheMind
  source:
    address: ***
```

10. Create a symlink between your build folder containing the contract json files and an abis folder
```
 ln -s ../build/contracts abis
```

11. build and deploy subgraph to IPFS - This will produce an IPFS_HASH in the terminal
```
npm run build-ipfs
```

12. Start a local Graph node - You need to be in the graph-node project which should have been cloned as part of step 2. See Running a Local Graph Node in the [docs](https://github.com/graphprotocol/graph-node).
```
cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME[:PASSWORD]@localhost:5432/adchain-subgraph \
  --ethereum-rpc localhost:http://localhost:8545 \
  --ipfs 127.0.0.1:5001 \
  --subgraph IPFS_HASH
```
Note: 8545 should be the port your ganache blockchain is running on. Can be checked by going to settings in ganache.

13. Visit the graphiql interface at http://127.0.0.1:8000/ where you can query your indexed events (There wont be any indexed events yet)

### Running the client

14. Install node modules in client folder
```
cd ../client
npm install
```

15. Start the client
```
npm start
```

16. You will need to have MetaMask installed and pointing to your local blockchain - see [here](https://ethereum.stackexchange.com/questions/34287/using-ganache-with-an-existing-metamask-account)


## Status

The status of this project currently is a simple smart contract that allows users to ask a Question via a text input. 
All I currently aim to check is that the events are indexed and can be searched via the graphql interface. Give it a try.

I will be working to create a proper interface and integrate the graphql search into the frontend using Apollo.

## Get Involved

Don't hesitate to get in touch if you want to get involved!



