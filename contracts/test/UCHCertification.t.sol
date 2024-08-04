// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/UCHCertification.sol";

contract UCHCertificationTest is Test {
    UCHCertification cert;
    address owner = address(1);
    address recipient = address(2);

    function setUp() public {
        cert = new UCHCertification();
        cert.transferOwnership(owner);
    }

    function testIssueCertificate() public {
        vm.prank(owner);
        uint256 tokenId = cert.issueCertificate(recipient, "ipfs://QmHash");

        assertEq(cert.ownerOf(tokenId), recipient);
        assertEq(cert.tokenURI(tokenId), "ipfs://QmHash");
    }

    function testRevokeCertificate() public {
        vm.prank(owner);
        uint256 tokenId = cert.issueCertificate(recipient, "ipfs://QmHash");

        vm.prank(owner);
        cert.revokeCertificate(tokenId);

        bool revoked = cert.isCertificateRevoked(tokenId);
        assertTrue(revoked);
    }

    function testFailTransferCertificate() public {
        vm.prank(owner);
        uint256 tokenId = cert.issueCertificate(recipient, "ipfs://QmHash");

        vm.prank(recipient);
        vm.expectRevert("ERC721TransferNotAllowed");
        cert.transferFrom(recipient, address(3), tokenId);
    }

    function testCannotIssueCertificateByNonOwner() public {
        vm.prank(address(4));
        vm.expectRevert();
        cert.issueCertificate(recipient, "ipfs://QmHash");
    }

    function testCannotRevokeCertificateByNonOwner() public {
        vm.prank(owner);
        uint256 tokenId = cert.issueCertificate(recipient, "ipfs://QmHash");

        vm.prank(address(4));
        vm.expectRevert();
        cert.revokeCertificate(tokenId);
    }

    function testRevokingNonExistentCertificateFails() public {
        vm.prank(owner);
        vm.expectRevert();
        cert.revokeCertificate(999);
    }

    function testRevokingAlreadyRevokedCertificateFails() public {
        vm.prank(owner);
        uint256 tokenId = cert.issueCertificate(recipient, "ipfs://QmHash");

        vm.prank(owner);
        cert.revokeCertificate(tokenId);

        vm.prank(owner);
        vm.expectRevert();
        cert.revokeCertificate(tokenId);
    }
}
