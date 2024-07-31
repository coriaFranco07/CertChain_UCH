// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title Contrato de Gestión de Estados
/// @dev Un contrato para gestionar la información de estados

contract Estado {
    struct EstadoInfo {
        uint id_estado;      // ID único del estado
        string nombre;       // Nombre del estado
    }

    mapping(uint => EstadoInfo) private estados;
    uint public estadoCount;

    event EstadoAdded(uint id_estado, string nombre);

    /// @notice Agregar un nuevo estado
    /// @param _nombre Nombre del estado
    /// @return id_estado ID del estado registrado
    function addEstado(string memory _nombre) public returns (uint) {
        estadoCount++;
        estados[estadoCount] = EstadoInfo(estadoCount, _nombre);
        emit EstadoAdded(estadoCount, _nombre);
        return estadoCount;
    }

    /// @notice Obtener información de un estado
    /// @param _estadoId ID del estado
    /// @return id_estado ID del estado
    /// @return nombre Nombre del estado
    function getState(uint _estadoId) public view returns (uint id_estado, string memory nombre) {
        EstadoInfo memory estadoInfo = estados[_estadoId];
        return (estadoInfo.id_estado, estadoInfo.nombre);
    }

    /// @notice Obtener el número total de estados registrados
    /// @return count Número total de estados
    function getTotalStates() public view returns (uint count) {
        return estadoCount;
    }
}
