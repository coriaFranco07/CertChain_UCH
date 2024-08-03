// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Certificado {
    struct CertificadoData {
        uint id_estudiante;
        uint id_nft;
        uint id_curso;
        uint fecha_emision;
        string firma;
        uint id_estado;
    }

    mapping(uint => CertificadoData) public certificados;
    uint public nextId;

    function emitirCertificado(
        uint idEstudiante,
        uint idNft,
        uint idCurso,
        uint fechaEmision,
        string memory firma,  // Debe ser string si estás enviando un hash como string
        uint idEstado
    ) public {
        certificados[nextId] = CertificadoData(
            idEstudiante, idNft, idCurso, fechaEmision, firma, idEstado
        );
        nextId++;
    }

    function obtenerCertificado(uint id) public view returns (
        uint id_estudiante,
        uint id_nft,
        uint id_curso,
        uint fecha_emision,
        string memory firma,
        uint id_estado
    ) {
        CertificadoData memory c = certificados[id];
        return (
            c.id_estudiante, c.id_nft, c.id_curso, c.fecha_emision,
            c.firma, c.id_estado
        );
    }
}
