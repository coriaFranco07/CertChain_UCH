import { ethers } from "ethers";
import dotenv from "dotenv";

// ABI of the UCHCertification contract
import abi_UCHCertification from "../abi/contracts/UCHCertification.sol/UCHCertification.json";

// Load environment variables from .env file
dotenv.config();

// Interface for the expected structure of NFT metadata
interface NFTAttribute {
  trait_type: string;
  value: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  strength: number;
  attributes: NFTAttribute[];
}

const { PRIVATE_KEY, SCROLL_DEVNET } = process.env;

if (!PRIVATE_KEY || !SCROLL_DEVNET) {
  console.error(
    "Please ensure your .env file includes PRIVATE_KEY and API_KEY_INFURA."
  );
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(SCROLL_DEVNET);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const certContractAddress = "0xc47C985a3DcCA3aCD5703A2f0D622Fe1075f19D4";
// Create a contract instance
const certContract = new ethers.Contract(
  certContractAddress,
  abi_UCHCertification,
  wallet
);

/**
 * Issues a new certificate.
 * @param recipient The address of the recipient.
 * @param ipfsHash The IPFS hash of the certificate content.
 */
async function issueCertificate(
  recipient: string,
  ipfsHash: string
): Promise<void> {
  try {
    const tx = await certContract.issueCertificate(recipient, ipfsHash);
    console.log(`Transaction sent: ${tx.hash}`);

    const receipt = await tx.wait();
    console.log(`Transaction confirmed: ${receipt.blockNumber}`);

    // Assuming the event is emitted and the ABI includes it
    const event = receipt.events?.find(
      (event: any) => event.event === "CertificateIssued"
    );
    if (event) {
      console.log(`Certificate issued: ${event.args.tokenId.toString()}`);
    }
  } catch (error) {
    console.error(`Error issuing certificate: ${error}`);
  }
}

/**
 * Retrieves the metadata of a specified NFT.
 * @param tokenId The ID of the token.
 */
async function retrieveNFTMetadata(tokenId: number): Promise<void> {
  try {
    console.log("Token ID:\n", tokenId);
    
    const result = await certContract.tokenURI(tokenId);
    const ipfsURL = addIPFSProxy(result);
    console.log("IPFS URL\n", ipfsURL);

    const response = await fetch(ipfsURL);
    const metadata: NFTMetadata = await response.json();
    console.log("NFT Metadata\n", metadata);

    if (metadata.image) {
      const image = addIPFSProxy(metadata.image);
      console.log("NFT Image URL\n", image);
    }

  } catch (error) {
    console.error(`Error retrieving NFT metadata: ${error}`);
  }
}

// Function to convert an IPFS hash to a URL using a public gateway
function addIPFSProxy(ipfsHash: string): string {
  const URL = "https://ipfs.io/ipfs/";
  const hash = ipfsHash.replace(/^ipfs?:\/\//, "");
  return URL + hash;
}

// Example IPFS_HASH_OF_CERTIFICATE
// ipfs://QmW7eM4xv5gTCvtUQ61P1QB79Li3TDY1wpz2PKavYNpj3Q
// ipfs://QmSnbKEJz1DuD93L4EL9gZMai4gmaFobtvFoLD2CiGTaXr

// Example usage:
const recipient = "0x4B41Bd281a360Ac5e016Ca721f87C14fC627623b";
const ipfsHash = "ipfs://QmW7eM4xv5gTCvtUQ61P1QB79Li3TDY1wpz2PKavYNpj3Q";

// Issue a certificate
// issueCertificate(recipient, ipfsHash);

// Retrieve metadata of a specific NFT (replace TOKEN_ID with actual token ID)
const tokenId = 3 ;
retrieveNFTMetadata(tokenId);
