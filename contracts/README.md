
# UCHCertification

UCHCertification is a smart contract that implements a certification system using soulbound NFTs (Non-Fungible Tokens) on the Ethereum blockchain. This contract leverages OpenZeppelin's ERC721 standard with additional functionality for certificate issuance, storage, and revocation.

## Table of Contents

- [Overview](#overview)
- [Contract Details](#contract-details)
  - [Functions](#functions)
  - [Events](#events)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Overview

The `UCHCertification` contract provides a decentralized way to issue, store, and revoke certificates. Each certificate is represented as a unique ERC721 token that is non-transferable (soulbound), ensuring the authenticity and integrity of the certification process.

## Contract Details

### Functions

#### `issueCertificate`

Issues a new certificate.

```solidity
function issueCertificate(address recipient, string memory ipfsHash) public onlyOwner returns (uint256)
```

- **Parameters**:
  - `recipient`: The address of the recipient.
  - `ipfsHash`: The IPFS hash of the certificate content.
- **Returns**: The ID of the newly issued certificate token.
- **Access Control**: Only the contract owner can call this function.

#### `revokeCertificate`

Revokes an existing certificate.

```solidity
function revokeCertificate(uint256 tokenId) external onlyOwner
```

- **Parameters**:
  - `tokenId`: The ID of the certificate to be revoked.
- **Access Control**: Only the contract owner can call this function.

#### `isCertificateRevoked`

Checks if a certificate is revoked.

```solidity
function isCertificateRevoked(uint256 tokenId) external view returns (bool)
```

- **Parameters**:
  - `tokenId`: The ID of the certificate.
- **Returns**: `true` if the certificate is revoked, otherwise `false`.

#### `transferFrom`

Overrides the transferFrom function to prevent transfer.

```solidity
function transferFrom(address, address, uint256) public virtual override(ERC721, IERC721)
```

- **Reverts**: Always reverts to prevent transfer of soulbound tokens.

### Events

#### `CertificateIssued`

Emitted when a new certificate is issued.

```solidity
event CertificateIssued(address recipient, uint256 tokenId, string ipfsHash)
```

- **Parameters**:
  - `recipient`: The address of the recipient.
  - `tokenId`: The ID of the issued certificate token.
  - `ipfsHash`: The IPFS hash of the certificate content.

#### `CertificateRevoked`

Emitted when a certificate is revoked.

```solidity
event CertificateRevoked(uint256 tokenId)
```

- **Parameters**:
  - `tokenId`: The ID of the revoked certificate token.

## Installation

To use this contract in your project with Foundry, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/coriaFranco07/CertChain_UCH.git
    cd CertChain_UCH/contracts
    ```

2. **Install Foundry**:
    If you haven't installed Foundry yet, follow these steps:
    ```bash
    curl -L https://foundry.paradigm.xyz | bash
    foundryup
    ```

3. **Install dependencies**:
    Ensure you have the necessary dependencies by running:
    ```bash
    forge install
    ```

4. **Compile the smart contracts**:
    Use Foundry to compile the contracts:
    ```bash
    forge build
    ```

## Usage

To deploy the `UCHCertification` contract using Foundry to Scroll DevNet, create a deployment script and run:

```bash
source .env
forge script script/DeployToScroll.s.sol --broadcast --rpc-url $SCROLL_DEVNET --private-key $PRIVATE_KEY
```
Replace `<network-url>` with the desired network's RPC URL and `<private-key>` with your private key.

### Interacting with the Contract

In the `/tsscript` folder, there is a TypeScript script to interact with the contract. To interact with deployed contracts from TypeScript scripts, we need to install `TypeScript`, `ts-node`, `ethers`, and `dotenv`.

Install the necessary packages:
```bash
bun install --save-dev typescript ts-node @types/node
bun install --save ethers dotenv
```

To run the script:
```bash
npx ts-node tsscript/certification.ts
```

### TypeScript Script Details

The TypeScript script `tsscript/certification.ts` performs the following functions:

1. **Issue Certificate**:
   - Issues a new certificate to a specified recipient with a given IPFS hash.
   - Logs the transaction hash and the token ID of the issued certificate.
   - Example usage: Uncomment the `issueCertificate` function call and provide appropriate values.

2. **Retrieve NFT Metadata**:
   - Retrieves and logs the metadata of a specified NFT by its token ID.
   - Converts IPFS hash to a public URL and fetches the metadata.
   - Example usage: Uncomment the `retrieveNFTMetadata` function call and provide the token ID.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
