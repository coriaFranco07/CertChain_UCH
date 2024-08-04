
#  CertChain_UCH

## Level Up Argentina × Scroll
- Track: General
- Bounty: Beginers



CertChain_UCH is a hybrid blockchain project designed for issuing diplomas and certifications, combining on-chain and off-chain data storage to achieve scalability, privacy, and security.


## Table of Contents

- [Overview](#overview)
- [Repo Structure](#repo-structure)
- [Key Components](#key-components)
- [Workflow](#workflow)
- [Advantages](#advantages)
- [License](#license)

## Overview

CertChain_UCH leverages blockchain technology to issue, verify, and manage certifications using a hybrid approach. It utilizes soulbound NFTs, which are non-transferable and permanently tied to the recipient's address, ensuring the integrity and authenticity of certifications.

## Repo Structure

Here's the modified section with the added link to the Contracts README:

## Repo Structure

- **Backend**: Node.js project
- **Frontend**: React-based project
- **Contracts**: Foundry project with the certification contract. [Contracts README](https://github.com/coriaFranco07/CertChain_UCH/blob/main/contracts/README.md)

The smart contract is deployed and verified on the Scroll Devnet [L2 LOCAL] Scroll.

- **Contract Address**: `0xc47C985a3DcCA3aCD5703A2f0D622Fe1075f19D4`
- [Scroll Devnet Blockscout](https://l1sload-blockscout.scroll.io/address/0xc47C985a3DcCA3aCD5703A2f0D622Fe1075f19D4/contracts#address-tabs)

## Key Components

### On-Chain Data

- **Certificate Hash**: Ensures the integrity and immutability of the document.
- **Metadata**: Includes certificate ID, issue date, issuer's address, and recipient's wallet address.
- **Revocation Status**: Maintains a registry for invalidated certificates.

### Off-Chain Data

- **Certificate Content**: Stores the actual document in IPFS (InterPlanetary File System).
- **Personal Information**: Maintains privacy by storing sensitive data off-chain.

### Soulbound NFTs

- Represent certificates as non-transferable tokens tied to the recipient's address.
- Contain references to the off-chain data location and on-chain certificate hash.

## Workflow

### Issuance

1. The issuing institution generates the certificate and hashes its content.
2. Certificate content is uploaded to IPFS, and the hash is stored on-chain.
3. A soulbound NFT is minted and sent to the recipient’s address, containing metadata and a reference to off-chain storage.

### Verification

1. A verifier retrieves the NFT from the recipient’s wallet.
2. The verifier uses the NFT reference to access the certificate content from IPFS.
3. The verifier hashes the retrieved document and compares it with the on-chain hash.

### Revocation

1. The issuer updates the on-chain revocation registry if a certificate needs to be revoked.
2. Verifiers can check the revocation status during the verification process.

## Advantages

- **Scalability**: Off-chain storage reduces on-chain data load.
- **Privacy**: Sensitive information is stored off-chain, ensuring compliance with data protection regulations.
- **Security**: Immutable on-chain hashes guarantee the integrity and authenticity of certificates.
- **Flexibility**: Supports various types of certifications and issuers.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
