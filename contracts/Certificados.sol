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
        string hashCertificado; 
    }

    mapping(string => CertificadoData) public certificados; // Mapea el hashCertificado
    uint public nextId;

    function emitirCertificado(
        uint idEstudiante,
        uint idNft,
        uint idCurso,
        uint fechaEmision,
        string memory firma,
        uint idEstado,
        string memory hashCertificado // Campo agregado para el hash del certificado
    ) public {
        certificados[hashCertificado] = CertificadoData(
            idEstudiante, idNft, idCurso, fechaEmision, firma, idEstado, hashCertificado
        );
        nextId++;
    }

    function obtenerCertificado(string memory hashCertificado) public view returns (
        uint id_estudiante,
        uint id_nft,
        uint id_curso,
        uint fecha_emision,
        string memory firma,
        uint id_estado
    ) {
        CertificadoData memory c = certificados[hashCertificado];
        return (
            c.id_estudiante, c.id_nft, c.id_curso, c.fecha_emision,
            c.firma, c.id_estado
        );
    }
}
