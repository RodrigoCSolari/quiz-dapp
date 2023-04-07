# Quiz-Dapp

## Description

A web3 application that connects to the Ethereum blockchain through MetaMask. Users can participate in surveys in exchange for airdrops of Quiz Tokens.

## Vercel deployment

- https://quiz-dapp-git-dev-rodrigocsolari.vercel.app/

## Technologies Used

- Next.js
- Typescript
- Ethers.js
- Ant Design
- Metamask

## Commands to Run the App

1. Clone this repository:

```bash
git clone https://github.com/RodrigoCSolari/quiz-dapp.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root of the project and configure environment variables:

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI="0x437eF217203452317C3C955Cf282b1eE5F6aaF72"
NEXT_PUBLIC_VERCEL_ENV="goerli"
```

4. Run the app in development mode:

```bash
npm run dev
```

5. Open the app in your web browser:

```bash
http://localhost:3000
```

## Environment Variables

The app uses the following environment variables:

- `NEXT_PUBLIC_CONTRACT_ADDRESS_GOERLI`: Goerli quiz token address.
- `NEXT_PUBLIC_VERCEL_ENV`: Name of the ethereum nertwork.

## Screenshots

### Login

![Screenshot of App in Action](/assets/login.png)

### Wrong network

![Screenshot of App in Action](/assets/wrong-network.png)

### Home

![Screenshot of App in Action](/assets/home.png)

### Account modal

![Screenshot of App in Action](/assets/modal.png)

### Survey

![Screenshot of App in Action](/assets/survey.png)

### Survey overview

![Screenshot of App in Action](/assets/overview.png)

## Resources

List of resources used to build this app.

- [Ethers.js](https://docs.ethers.org/v5)
- [Ant desing](https://ant.design/)
- [Metamask guide](https://docs.metamask.io/)
