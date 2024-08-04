// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Certification
 * @dev Implementation of a certification system using soulbound NFTs
 */
contract UCHCertification is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    mapping(uint256 => bool) private _revokedCertificates;

    event CertificateIssued(
        address recipient,
        uint256 tokenId,
        string ipfsHash
    );
    event CertificateRevoked(uint256 tokenId);

    constructor() ERC721("Certification", "CERT") Ownable(msg.sender) {
        transferOwnership(msg.sender);
    }

    /**
     * @dev Issues a new certificate.
     * @param recipient The address of the recipient.
     * @param ipfsHash The IPFS hash of the certificate content.
     */
    function issueCertificate(
        address recipient,
        string memory ipfsHash
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, ipfsHash);

        emit CertificateIssued(recipient, tokenId, ipfsHash);

        return tokenId;
    }

    /**
     * @dev Revokes an existing certificate.
     * @param tokenId The ID of the certificate to be revoked.
     */
    function revokeCertificate(uint256 tokenId) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Certificate does not exist");
        require(!_revokedCertificates[tokenId], "Certificate already revoked");
        _revokedCertificates[tokenId] = true;
        emit CertificateRevoked(tokenId);
    }

    /**
     * @dev Checks if a certificate is revoked.
     * @param tokenId The ID of the certificate.
     * @return bool indicating if the certificate is revoked.
     */
    function isCertificateRevoked(
        uint256 tokenId
    ) external view returns (bool) {
        return _revokedCertificates[tokenId];
    }

    /**
     * @dev Overrides the transferFrom function to prevent transfer.
     */
    function transferFrom(
        address,
        address,
        uint256
    ) public virtual override(ERC721, IERC721) {
        revert();
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
