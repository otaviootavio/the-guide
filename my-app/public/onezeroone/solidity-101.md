---
playlistTitle: Introductory course on Solidity! 
descricaoPlaylist: "In this course, you will learn the basics of the Solidity programming language, how to create a wallet on Sepolia, how to create a contract on Remix, and how to deploy your smart contract."
---

# Welcome to the introductory course on Solidity! 
In this course, you will learn the basics of the Solidity programming language, how to create a wallet on Sepolia, how to create a contract on Remix, and how to deploy your smart contract.

## Introduction to Smart Contract

The name “contract” comes from the very first notion that there will be a “contract” on the chain, that is represented by two persons, and they can sign it, and it will do the logic. Like on sport bets, loans, or some financial operations could be automated by that contract. Image someone who borrows some money from his or her friend. It is possible to create a contract that adds some special parameters to that borrow, such as month fees or something like that.

So, basically, it is just a program on the Chain. It is not smart, and it is not a contract. Perhaps it is simply a bad name, on other chains like Solana, smart contracts are referred to as “programs” because they are written in the Rust programming language, which is a popular systems programming language known for its speed and performance.

On a more historical point of view, it was introduced a long time ago, but just on paper, no code. This strongly inspired Bitcoin, which has a very limited smart contract concept. We will keep the focus on the Ethereum.
http://www.weidai.com/bmoney.txt

In the following paragraphs, we will focus on how to develop it on Ethereum using Solidity. Solidity is a high-level programming language that is used to write smart contracts on the Ethereum blockchain. It is a contract-oriented language that is specifically designed to write code for the Ethereum Virtual Machine (EVM).

### Why on Ethereum?
Ethereum was the very first project to build this concept, and make a decentralized state machine on the public blockchain universe. This state machine has the same build as a computer, with byte code, assembly and all this low-level stuff.

### So, what is about the EVM?
Imagine it like a well-defined computer architecture that people enjoyed and used it as standard for blockchain architectures. In details, an EVM refers to a "Virtual Machine", sometimes called a "State Machine". This standard describes how the blockchain nodes should behave and interact with the smart contract in it. The nodes may agree on what is the output based on its inputs. The input is given via transactions, and the output is written on the blockchain.

## Why it matters for the bakery.
Imagine a bakery that specializes in gluten-free bread and sells its products online. The bakery has a website where customers can place orders and pay with cryptocurrencies like Ethereum. To streamline the ordering and payment process, the bakery decided to use smart contracts.

The bakery's web developer creates a smart contract that outlines the terms of the sale, including the price of the bread, the delivery address, and the payment method. The smart contract is written in Solidity and tested on a test net to ensure that it works as expected.

Once the smart contract is ready, the bakery deploys it to the Ethereum blockchain using a wallet like MetaMask. This allows customers to interact with the contract directly by sending a transaction that includes the necessary information.

When a customer places an order on the bakery's website, the order details are sent to the smart contract along with the payment in Ethereum. The smart contract then verifies the payment and initiates the delivery of the bread to the customer's address.

If there are any issues with the transaction, such as an incorrect delivery address or insufficient funds, the smart contract will automatically reject the transaction and refund the payment to the customer's wallet.

By using smart contracts, the bakery can automate the ordering and payment process, reduce the risk of fraud and errors, and offer a more secure and reliable service to its customers. The bakery can also save time and resources by eliminating the need for manual order processing and payment verification.

In conclusion, smart contracts can be a valuable tool for businesses like bakeries that sell products or services online. By creating smart contracts that automate the transaction process, businesses can streamline their operations, reduce costs, and offer a more secure and reliable service to their customers.

## Can I use Objetcs?
Contract-oriented programming differs from object-oriented programming (OOP) in that it focuses on contracts and their interactions rather than on objects and their interactions. In contract-oriented programming, contracts are treated as first-class citizens and can be thought of as autonomous agents that interact with one another.

In comparison to popular coding languages like C, Java, JavaScript, Go, and Haskell, contract-oriented programming is a relatively new paradigm. While some of these languages can be used to write smart contracts, they were not designed specifically for that purpose.

For example, C and Java are both popular general-purpose programming languages that can be used for a wide range of applications. JavaScript is commonly used for building web applications, while Go is known for its simplicity and speed. Haskell is a functional programming language that is often used for academic and research purposes.

While these languages can be used to write smart contracts, they may not be the best choice for this task. Solidity, on the other hand, was designed specifically for writing smart contracts and includes features such as a built-in contract-oriented programming model and automatic memory management, which make it easier to write secure and efficient smart contracts.

In summary, contract-oriented programming is a programming paradigm that is focused on writing smart contracts, and Solidity is the most popular language for writing smart contracts on the Ethereum blockchain. While popular coding languages like C, Java, JavaScript, Go, and Haskell can be used to write smart contracts, they were not designed specifically for that purpose and may not be the best choice for this task.

### So let's code!
Actually no... yes, we can code already, but I need to explain first what a network is. The contract can run locally, but is very different from coding in C or in Java. The code **must** be in a network, and that is why we need a blockchain!

In Remix, a test net and a VM are both tools that can be used to test and deploy smart contracts, but they differ in their functionality and purpose.

A test net is a separate blockchain network that is designed specifically for testing and experimentation. Test nets are typically used to test new features or applications without risking real funds or affecting the main blockchain network. Examples of popular test nets include Ropsten, Kovan, and Rinkeby.

You can select a test net at Remix from the "Environment" dropdown menu in the "Deploy & Run Transactions" tab. When you select a test net, Remix will connect to the network and allow you to deploy and test your smart contracts on that network. Test nets can be useful for testing and debugging smart contracts before deploying them to the main blockchain network.

A VM (virtual machine), on the other hand, is a virtual machine that runs locally on your computer. The Remix VM allows you to simulate the behavior of a blockchain network on your local machine, without actually connecting to a real network. This can be useful for testing and experimenting with smart contracts without the need for a real network connection.

To get started, open the Remix IDE in your web browser and create a new Solidity file. You can do this by clicking on the "+" button in the left-hand sidebar and selecting "New file."

Since we are going to just code for the moment, don't worry about what network we are using now. We will cover this in the next step.

### Storage a number and read it!
Ok, so it is the most basic contract on Solidity. It may be avaliable on Remix on the example contracts folder.

Let's break it down and explain it!

```
// SPDX-License-Identifier: GPL-3.0
```

This is a comment in the code that specifies the license under which the code is released. In this case, the license is the GNU General Public License version 3.0 (GPL-3.0).

Other popular open-source licenses include:
-   Apache License 2.0: another permissive license that includes a patent grant, allowing users to distribute the software without worrying about potential patent litigation.
-   BSD 3-Clause License: another permissive license that allows users to use, modify, and distribute the software without requiring them to release their modifications under the same license.
-   Creative Commons licenses: a suite of licenses that are used primarily for creative works, such as music, videos, and images. These licenses allow creators to specify how their works can be used and distributed, while still retaining certain rights.
-   Mozilla Public License 2.0: a copyleft license similar to GPL-3.0, but with more flexible licensing options for incorporating code into proprietary software.

```
pragma solidity >=0.8.2 <0.9.0;
```

This is a Solidity pragma directive that specifies the version of the Solidity compiler that should be used to compile the contract. In this case, the contract requires a Solidity compiler version greater than or equal to 0.8.2, but less than version 0.9.0.


```
/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
```

This is a Solidity comment that provides a brief description of the contract. The comment starts with a title, followed by a brief description of the contract's functionality. The last line is a custom comment added by the developer that specifies a script to be run during deployment.


```
contract Storage {
```

This is the start of the contract declaration. The name of the contract is "Storage".


```
uint8 number;
```

This declares a state variable called "number" of type "uint8", which is an unsigned integer with a range of 0 to 255. This variable will be used to store the value set by the "store" function.


```
function store(uint8 num) public {
    number = num;
}
```

This declares the "store" function, which takes a parameter called "num" of type "uint8". This function is marked as "public", which means that it can be called by anyone who interacts with the contract. The function assigns the value of "num" to the "number" state variable.


```
function retrieve() public view returns (uint256){
    return number;
}
```

This declares the "retrieve" function, which returns the value of the "number" state variable. The function is marked as "public" and "view", which means that it can be called by anyone who interacts with the contract and that it doesn't modify the state of the contract. The function returns a value of type "uint256", which is an unsigned integer with a range of 0 to 2^256-1.

### Going in the wild
First, deploying a smart contract on a blockchain network typically requires payment of a transaction fee in the network's native token. This fee is necessary to incentivize miners or validators on the network to process and confirm the transaction. Without tokens in your wallet to pay for the fee, you would not be able to deploy the smart contract on the network.

Second, interacting with a smart contract also requires payment of transaction fees, which are usually paid in the network's native token. Every time you invoke a function in a smart contract, a transaction is generated and broadcast to the network. This transaction must be processed and confirmed by the network's validators, who are incentivized to do so by receiving a portion of the transaction fees. Without tokens in your wallet to pay for the fees, you would not be able to interact with the smart contract on the network.

### Getting some test money
To get coins in the Sepolia test network for testing purposes, you can use a faucet. A faucet is a tool that allows users to request a small amount of tokens for free in order to test and experiment with a blockchain network without having to spend real money.

To get coins in the Sepolia test network using a faucet, you can follow these steps:

1.  Go to the Sepolia test [network's official](https://faucet.sepolia.network/)  website and locate the faucet. 
2.  Enter your wallet address for the Sepolia test network.
3.  Follow the instructions on the faucet to complete any additional steps, such as solving a captcha or completing a survey.
4.  Wait for the transaction to be processed and for the coins to appear in your wallet.

To set the Sepolia network on the Metamask wallet, you can follow these steps:

1.  Open the Metamask wallet and click on the network dropdown menu.
2.  Click on "Custom RPC" at the bottom of the list.
3.  Enter the following information for the Sepolia network:
    -   Network Name: Sepolia
    -   New RPC URL: [https://sepolia.network](https://sepolia.network/)
    -   ChainID: 999 (or any unique number)
    -   Symbol: SPL
    -   Block Explorer URL: [https://sepolia.network/explorer/](https://sepolia.network/explorer/)
4.  Click "Save" to add the Sepolia network to your Metamask wallet.
5.  To switch to the Sepolia network, select "Sepolia" from the network dropdown menu in the Metamask wallet.

Once you have received coins from the faucet, you can use them to deploy and interact with smart contracts on the Sepolia test network. It's important to note that the coins obtained from the faucet are only intended for testing purposes and do not have any real value. They are designed to help developers and users test the network and its functionality without risking real funds.

### Deploying a Smart Contract on Remix

1.  Open the Remix IDE in your web browser.
2.  Create a new Solidity file by clicking on the "+" button in the left-hand sidebar and selecting "New file."
3.  Write some code.
4.  Click on the "Compile" button in the left-hand sidebar to compile your smart contract. If there are any errors in your code, they will be displayed in the "Errors" section below the editor.
5.  Once your smart contract has been successfully compiled, click on the "Deploy & Run Transactions" tab in the left-hand sidebar.
6.  Select the appropriate network from the "Environment" dropdown menu. If you want to deploy your smart contract on a testnet, select the testnet of your choice.
7.  Click on the "Deploy" button to deploy your smart contract to the selected network. The deployment process may take a few moments to complete.
8.  Once your smart contract has been deployed, you will see the details of the deployment in the "Deployed Contracts" section of the page.

### Interacting with a Smart Contract on Remix

1.  In the "Deployed Contracts" section, you will see the name of your smart contract and its address. Click on the arrow next to the name of your smart contract to expand its details.
2.  You will see a list of the functions available in your smart contract. Click on the function you want to interact with.
3.  In the "Value" field, enter any necessary parameters for the function. For example, if your function takes an integer as a parameter, enter the desired integer value in the "Value" field.
4.  Click on the function button to execute the function.
5.  Once the function has been executed, you will see the result of the function in the "Transactions" section of the page. If the function modified the state of the smart contract, you will see the updated state in the "Deployed Contracts" section.

That's it! You can now deploy and interact with your smart contract on Remix.


## Conclusion
-   Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code.
-   Solidity is a popular programming language for writing smart contracts on the Ethereum blockchain.
-   To deploy and interact with smart contracts on a blockchain network like Sepolia, it is necessary to have tokens in your wallet to pay for transaction fees and potentially participate in certain activities or receive certain rewards.
-   For testing purposes, you can use a faucet to get test coins on the Sepolia test network without having to spend real money.
-   To set up the Sepolia network on the Metamask wallet, you can follow the steps listed in a previous message.

### How to memorize all these concepts!
To become proficient in smart contract development and blockchain technology, it is important to keep practicing and experimenting. Start with simple contracts and gradually increase the complexity as you gain more experience.

1.  Write a simple smart contract in Solidity that stores and retrieves a string value. Test the contract on the Sepolia test network using Remix.
2.  Use a faucet to get test coins on the Sepolia test network and deploy a simple smart contract that transfers tokens from one wallet address to another.
3.  Write a smart contract that implements a simple voting system, where each voter can cast a vote for a candidate and the candidate with the most votes wins. Test the contract on the Sepolia test network using Remix and a faucet to get test coins.
4.  Implement a smart contract that allows users to create and sell tickets for an event. The contract should allow users to purchase tickets and transfer them to other users. Test the contract on the Sepolia test network using Remix and a faucet to get test coins.

### Need another explanation?
There are also many resources available online to help you learn more about smart contracts and blockchain technology, such as documentation, tutorials, and online communities. Don't be afraid to ask questions and seek help when you encounter difficulties or have questions.

[Solidity Documentation](https://docs.soliditylang.org/en/v0.8.19/): The official documentation for Solidity, including a language reference, tutorials, and examples.
<br/>
[Solidity By Example](https://solidity-by-example.org/): A collection of Solidity code examples for beginners, including contracts for storing data, managing ownership, and implementing simple games.


## That is enough for today!

In summary, we've covered a lot of ground in our exploration of smart contract development using Solidity. We've learned how to write code that stores and retrieves data on the blockchain, how to create tokens that can be traded on decentralized exchanges, and how to develop smart contracts that interact with each other.

Developing advanced Solidity smart contracts is like baking the perfect sandwich. Just as a sandwich has a set of standard ingredients, smart contracts have a set of standard contract standards, such as ERC-20 for tokens or ERC-721 for non-fungible tokens. These standards provide a set of rules and guidelines for creating interoperable and compatible contracts.

Deploying a smart contract to the main network is like opening a bakery. You need to carefully consider the location, competition, and customer demand before opening your shop. Similarly, you need to carefully consider the gas fees, network congestion, and security risks before deploying your contract to the main network.

Testing your smart contract is like perfecting a recipe for bread, cheese, butter, or bun. Each component of the sandwich needs to be tested and refined until it meets your standards. Similarly, each component of the smart contract needs to be thoroughly tested and refined until it meets the requirements and specifications.

As you continue your journey into Solidity development, here are a few next steps you can take:

1.  Learn more about Solidity's advanced features, such as inheritance, libraries, and events.
2.  Experiment with developing more complex smart contracts, such as those that involve multiple parties, oracles, and governance.
3.  Explore tools like Hardhat and Truffle that provide additional functionality for smart contract development, such as automated testing, contract debugging, and deployment scripts.
4.  Join the Solidity community and participate in online forums, Discord channels, and other communities to share your knowledge and learn from others.

By continuing to learn and experiment with smart contract development, you can become a master baker of the blockchain world, creating innovative solutions that are secure, efficient, and useful for a variety of industries and applications.