// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title Contrato de Gestión de Estudiantes
/// @dev Un contrato para gestionar la información de estudiantes

import "./Estado.sol";

contract Estudiante is Estado {

   
    struct InfoEstudiante {
        uint id_estudiante;   
        string nombre;        
        string apellido;      
        string email;         
        uint fecha_nacimiento;
        uint id_estado;       
    }

    // Mapeo para almacenar estudiantes por su ID
    mapping(uint => InfoEstudiante) private estudiantes;

    // Número total de estudiantes registrados
    uint private contadorEstudiantes;

    // Evento que se emite cuando se registra un nuevo estudiante
    event EstudianteRegistrado(uint id_estudiante, string nombre, string apellido, uint id_estado);

    // Evento que se emite cuando se actualiza la información de un estudiante
    event InformacionActualizada(uint id_estudiante, string nuevoNombre, string nuevoApellido);

    /// @notice Registrar un nuevo estudiante
    /// @param _nombre Nombre del estudiante
    /// @param _apellido Apellido del estudiante
    /// @param _email Email del estudiante
    /// @param _fecha_nacimiento Fecha de nacimiento del estudiante (timestamp)
    /// @param _id_estado ID del estado inicial del estudiante
    /// @return id_estudiante ID del estudiante registrado
    function registrarEstudiante(
        string memory _nombre,
        string memory _apellido,
        string memory _email,
        uint _fecha_nacimiento,
        uint _id_estado
    ) public returns (uint) {
        require(_id_estado > 0 && _id_estado <= Estado.estadoCount, "Estado no valido"); // Verifica que el estado es válido

        contadorEstudiantes++; // Incrementa el contador de estudiantes
        estudiantes[contadorEstudiantes] = InfoEstudiante(
            contadorEstudiantes,
            _nombre,
            _apellido,
            _email,
            _fecha_nacimiento,
            _id_estado
        ); // Almacena el nuevo estudiante

        emit EstudianteRegistrado(contadorEstudiantes, _nombre, _apellido, _id_estado); // Emite el evento de registro
        return contadorEstudiantes; // Devuelve el ID del estudiante
    }

    /// @notice Obtener información de un estudiante
    /// @param _id_estudiante ID del estudiante
    /// @return id_estudiante ID del estudiante
    /// @return nombre Nombre del estudiante
    /// @return apellido Apellido del estudiante
    /// @return email Email del estudiante
    /// @return fecha_nacimiento Fecha de nacimiento del estudiante
    /// @return id_estado ID del estado del estudiante
    function obtenerEstudiante(uint _id_estudiante) public view returns (
            uint id_estudiante,
            string memory nombre,
            string memory apellido,
            string memory email,
            uint fecha_nacimiento,
            uint id_estado
        )
    {
        InfoEstudiante memory infoEstudiante = estudiantes[_id_estudiante]; // Obtiene el estudiante por su ID
        return (
            infoEstudiante.id_estudiante,
            infoEstudiante.nombre,
            infoEstudiante.apellido,
            infoEstudiante.email,
            infoEstudiante.fecha_nacimiento,
            infoEstudiante.id_estado
        ); // Devuelve la información del estudiante
    }

    /// @notice Actualizar la información de un estudiante
    /// @param _id_estudiante ID del estudiante
    /// @param _nuevoNombre Nuevo nombre del estudiante
    /// @param _nuevoApellido Nuevo apellido del estudiante
    function actualizarInformacion(
        uint _id_estudiante,
        string memory _nuevoNombre,
        string memory _nuevoApellido
    ) public {
        InfoEstudiante storage estudiante = estudiantes[_id_estudiante]; // Accede al estudiante por referencia
        estudiante.nombre = _nuevoNombre; // Actualiza el nombre del estudiante
        estudiante.apellido = _nuevoApellido; // Actualiza el apellido del estudiante

        emit InformacionActualizada(_id_estudiante, _nuevoNombre, _nuevoApellido); // Emite el evento de actualización
    }

    /// @notice Cambiar el estado de un estudiante
    /// @param _id_estudiante ID del estudiante
    /// @param _nuevoIdEstado Nuevo estado del estudiante
    function cambiarEstadoEstudiante(uint _id_estudiante, uint _nuevoIdEstado) public {
        require(_nuevoIdEstado > 0 && _nuevoIdEstado <= Estado.estadoCount, "Estado no valido");
        estudiantes[_id_estudiante].id_estado = _nuevoIdEstado; // Cambia el estado del estudiante
    }

    /// @notice Obtener el número total de estudiantes registrados
    /// @return contador Número total de estudiantes
    function obtenerTotalEstudiantes() public view returns (uint contador) {
        return contadorEstudiantes; // Devuelve el contador de estudiantes
    }
}
