---
playlistTitle: Building an ERC-20 DApp with React, Sepolia Network, Ethers v6, and Vite
descricaoPlaylist: "By the end of this tutorial, you'll be well-equipped to create your own DApps and integrate them with Ethereum-based smart contracts"
---

# Building an ERC-20 User Interface

Duration: 3 hours, one session

Welcome to this hands-on tutorial, where we'll guide you through building a decentralized application (DApp) that interacts seamlessly with an ERC-20 token smart contract. By leveraging powerful technologies like React, Vite, Ethers v6, and the Sepolia Network, we'll create an efficient, functional DApp that offers a practical understanding of these tools. By the end of this tutorial, you'll be well-equipped to create your own DApps and integrate them with Ethereum-based smart contracts.

React is a highly popular and versatile JavaScript library used for crafting user interfaces. Known for its component-based approach, React allows developers to create reusable, efficient UI components that are easy to maintain. With a strong community backing and continuous support from Facebook, React has emerged as the go-to choice for many developers.

Vite is a cutting-edge build tool and development server that harnesses the power of native ES modules in modern browsers. It offers a streamlined development experience through features such as hot module replacement and production build optimizations. Additionally, Vite simplifies the setup process for React projects, making it even more convenient for developers.

To facilitate seamless interaction with Ethereum-based blockchain networks, we'll use Ethers v6, a comprehensive library that simplifies connecting to a blockchain, executing transactions, and reading data from smart contracts. Boasting a well-structured API and extensive documentation, Ethers v6 is highly favored among Ethereum developers.

Throughout this tutorial, we'll deploy our smart contract on the Sepolia Network, a testnet designed specifically for the Ethereum blockchain. Sepolia offers developers a risk-free environment to deploy and test smart contracts before migrating to the mainnet, ensuring optimal functionality and security.

Our DApp will focus on interacting with an ERC-20 token smart contract, a widely adopted token standard on the Ethereum blockchain. The ERC-20 standard outlines a set of rules and functions that a smart contract must implement to qualify as an ERC-20 token. This standardization fosters seamless integration of new tokens into existing platforms like wallets and decentralized exchanges. As we progress through the tutorial, we'll delve into the key functions of an ERC-20 contract and demonstrate how to interact with them using our DApp.

## Setting up the Project (20 minutes)    

### Creating a React project with Vite

To create a new React project with Vite, open your terminal or command prompt and run the following command:

```
npm init vite@latest my-dapp --template react-js
```

Replace `my-dapp` with the name you want to give to your project. This command initializes a new Vite project with the React template. Once the project is created, navigate to the project folder using:

```
cd my-app
```

Now, install the necessary dependencies by running:

```
npm install
```


### Cleaning up the project (removing unnecessary files)

Vite creates a basic project structure with some unnecessary files for our purpose. We will remove them to keep our project clean and focused.
In the `src` folder, delete the following files: `App.css` `logo.svg`

Next, open `App.js` and remove the import statements for the deleted files:

```
// Remove these lines
import logo from './logo.svg';
import './App.css';
```

Also, remove or update the content inside the `App` component to get rid of references to the deleted files:

```
function App() {
  return (
    <div>
      <h1>Welcome to our ERC-20 DApp!</h1>
    </div>
  );
}
```

### Installing dependencies (Ethers v6)
To interact with the Ethereum blockchain, we will use the Ethers.js library. At the time of writing this tutorial, Ethers v6 is the latest version. Install it using the following command:
```
npm install ethers@next
```

### React Components and Hooks (30 minutes)

#### Creating a custom hook for connecting to Sepolia

First, let's create a custom hook to manage the connection to the Sepolia Network. Create a new file called `useEthereum.js` in the `src` folder, and add the following code:

```import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useEthereum = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethereumProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethereumProvider);
    } else {
      const defaultProvider = ethers.getDefaultProvider();
      setProvider(defaultProvider);
    }
  }, []);

  return provider;
};

export default useEthereum;
```

This custom hook checks for the presence of MetaMask and initializes the Ethers.js provider using the MetaMask provider. The provider is then stored in the component state and returned to be used in other components.

2.  Using React context to provide access to Ethers v6

Now, we'll create a React context to make the Ethers.js provider accessible to all components in our application. Create a new file called `EthereumContext.js` in the `src` folder and add the following code:
```
import { createContext } from 'react';

const EthereumContext = createContext(null);

export default EthereumContext;
```

Next, update `App.js` to use the `useEthereum` hook and provide the Ethers.js provider through the `EthereumContext.Provider` component:

```
import { EthereumContext } from './EthereumContext';
import useEthereum from './useEthereum';

function App() {
  const provider = useEthereum();

  return (
    <EthereumContext.Provider value={provider}>
      <div>
        <h1>Welcome to our ERC-20 DApp!</h1>
        {/* Add your DApp components here */}
      </div>
    </EthereumContext.Provider>
  );
}

export default App;
```

3.  Building essential UI components for the DApp
Now, let's create some essential UI components for our DApp. We'll start with a component that connects the user's MetaMask account to the DApp. Create a new file called `ConnectButton.js` in the `src` folder and add the following code:

```
import { useContext } from 'react';
import EthereumContext from './EthereumContext';

const ConnectButton = () => {
  const provider = useContext(EthereumContext);

  const connect = async () => {
    if (!provider || provider instanceof ethers.providers.JsonRpcProvider) {
      alert('MetaMask is not installed');
      return;
    }

    try {
      await provider.getSigner();
      alert('Connected successfully');
    } catch (error) {
      alert('Failed to connect');
    }
  };

  return (
    <button onClick={connect}>
      Connect to MetaMask
    </button>
  );
};

export default ConnectButton;
```

In `App.js`, import and use the `ConnectButton` component:

```
import ConnectButton from './ConnectButton';

function App() {
  // ...
  return (
    <EthereumContext.Provider value={provider}>
      <div>
        <h1>Welcome to our ERC-20 DApp!</h1>
        <ConnectButton />
        {/* Add more DApp components here */}
      </div>
    </EthereumContext.Provider>
  );
}

export default App;
```

The `ConnectButton` component uses the Ethers.js provider from the context and requests access to the user's MetaMask account when clicked.

#### Integrating Metamask authentication

Since we've already connected MetaMask to our DApp using the `ConnectButton` component, we can now retrieve the user's address from the signer object.

First, let's update the `ConnectButton.js` component to store the user's address in the state after connecting to MetaMask. Add a new state variable called `userAddress` and a callback function called `onConnect`.

```
import { useState, useContext } from 'react';
import EthereumContext from './EthereumContext';

const ConnectButton = ({ onConnect }) => {
  const [userAddress, setUserAddress] = useState(null);
  const provider = useContext(EthereumContext);

  const connect = async () => {
    if (!provider || provider instanceof ethers.providers.JsonRpcProvider) {
      alert('MetaMask is not installed');
      return;
    }

    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
      alert('Connected successfully');

      if (onConnect) {
        onConnect(address);
      }
    } catch (error) {
      alert('Failed to connect');
    }
  };

  return (
    <button onClick={connect}>
      {userAddress ? 'Connected' : 'Connect to MetaMask'}
    </button>
  );
};

export default ConnectButton;
```

Now, update `App.js` to store the user's address in the state and pass it to the `TokenBalance` component as a prop:

```
import { useState } from 'react';
import EthereumContext from './EthereumContext';
import useEthereum from './useEthereum';
import ConnectButton from './ConnectButton';
import TokenBalance from './TokenBalance';

function App() {
  const provider = useEthereum();
  const [userAddress, setUserAddress] = useState(null);

  return (
    <EthereumContext.Provider value={provider}>
      <div>
        <h1>Welcome to our ERC-20 DApp!</h1>
        <ConnectButton onConnect={setUserAddress} />
        <TokenBalance tokenAddress="YOUR_ERC20_TOKEN_ADDRESS" userAddress={userAddress} />
        {/* Add more DApp components here */}
      </div>
    </EthereumContext.Provider>
  );
}

export default App;
```

Finally, update the `TokenBalance.js` component to accept the `userAddress` prop and remove the input field for the user address:
```
import useTokenBalance from './useTokenBalance';

const TokenBalance = ({ tokenAddress, userAddress }) => {
  const balance = useTokenBalance(tokenAddress, userAddress);

  return (
    <div>
      <h3>Token balance for {userAddress ? userAddress : 'unknown user'}:</h3>
      <p>{balance ? balance : 'Connect to MetaMask to see your balance'}</p>
    </div>
  );
};

export default TokenBalance;
```

#### Creating a Token Transfer Component (30 minutes)
To create a token transfer component, first, we need to create a hook that will handle the transfer of tokens. Create a new file called `useTokenTransfer.js` in the `src` folder and add the following code:

```
import { useContext } from 'react';
import { ethers } from 'ethers';
import EthereumContext from './EthereumContext';
import erc20Abi from './erc20Abi';

const useTokenTransfer = (tokenAddress) => {
  const provider = useContext(EthereumContext);

  const transferTokens = async (recipient, amount) => {
    if (!provider || provider instanceof ethers.providers.JsonRpcProvider) {
      alert('MetaMask is not installed or connected');
      return;
    }

    try {
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);
      const decimals = await tokenContract.decimals();
      const weiAmount = ethers.utils.parseUnits(amount, decimals);
      const tx = await tokenContract.transfer(recipient, weiAmount);
      await tx.wait();
      alert('Token transfer successful');
    } catch (error) {
      alert('Token transfer failed');
    }
  };

  return transferTokens;
};

export default useTokenTransfer;

```


Now, create a new file called `TokenTransfer.js` in the `src` folder and add the following code:

```import { useState } from 'react';
import useTokenTransfer from './useTokenTransfer';

const TokenTransfer = ({ tokenAddress }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const transferTokens = useTokenTransfer(tokenAddress);

  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    transferTokens(recipient, amount);
  };

  return (
    <div>
      <h3>Transfer Tokens</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipient">Recipient Address:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={handleRecipientChange}
        />
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="any"
        />
        <button type="submit">Send Tokens</button>
      </form>
    </div>
  );
};

export default TokenTransfer;
```

Finally, update `App.js` to use the `TokenTransfer` component. Make sure to replace `YOUR_ERC20_TOKEN_ADDRESS` with the address of the ERC-20 token you want to transfer:

```
import TokenTransfer from './TokenTransfer';

function App() {
  // ...
  return (
    <EthereumContext.Provider value={provider}>
      <div>
        <h1>Welcome to our ERC-20 DApp!</h1>
        <ConnectButton onConnect={setUserAddress} />
        <TokenBalance tokenAddress="YOUR_ERC20_TOKEN_ADDRESS" userAddress={userAddress} />
        <TokenTransfer tokenAddress="YOUR_ERC20_TOKEN_ADDRESS" />
        {/* Add more DApp components here */}
      </div>
    </EthereumContext.Provider>
  );
}

export default App
```

### 5.  Deploying the DApp (20 minutes)

Now that we've finished building our DApp, it's time to deploy it. Since we're using Vite, we can take advantage of its production build optimizations to generate a production-ready build of our DApp.

First, update the `scripts` section in your `package.json` file:

```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview"
},
```

Now, run the following command in your terminal to create a production build of your DApp:
```
npm run build
```

This command will generate a `dist` folder containing the production-ready build of your DApp. You can now deploy this folder to any static site hosting service like Netlify, Vercel, or GitHub Pages.

To preview the production build locally, you can run the following command:
```
npm run serve
```

This command will start a local development server and open your DApp in the browser. You can then interact with your DApp to ensure everything works as expected before deploying it.

### Conclusion:

In this tutorial, we walked you through building a simple, functional ERC-20 DApp using React, Vite, Ethers v6, and the Sepolia Network. We covered creating a new React project with Vite, setting up Ethers v6 to interact with the Ethereum blockchain, and creating essential UI components and hooks to manage the connection, balance, and transfer of ERC-20 tokens.

By completing this tutorial, you should now have a solid understanding of how to build and deploy a decentralized application using modern web development tools and libraries. You can use this knowledge to create more advanced DApps or explore other aspects of Ethereum development, such as creating and deploying your own ERC-20 tokens or building more complex smart contracts.
