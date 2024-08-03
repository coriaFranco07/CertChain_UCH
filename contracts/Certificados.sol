// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Certificado {
    struct CertificadoData {
        uint id_certificado;
        string hash;
        uint id_estudiante;
        uint id_nft;
        uint id_curso;
        uint fecha_emision;
        string firma;
    }

    mapping(uint => CertificadoData) public certificados;
    uint public certificadoCount;

    event CertificadoEmitido(
        uint id_certificado,
        string hash,
        uint id_estudiante,
        uint id_nft,
        uint id_curso,
        uint fecha_emision,
        string firma
    );

    function emitirCertificado(
        string memory _hash,
        uint _id_estudiante,
        uint _id_nft,
        uint _id_curso,
        uint _fecha_emision,
        string memory _firma
    ) public {
        certificadoCount++;
        certificados[certificadoCount] = CertificadoData(
            certificadoCount,
            _hash,
            _id_estudiante,
            _id_nft,
            _id_curso,
            _fecha_emision,
            _firma
        );

        emit CertificadoEmitido(
            certificadoCount,
            _hash,
            _id_estudiante,
            _id_nft,
            _id_curso,
            _fecha_emision,
            _firma
        );
    }
}
