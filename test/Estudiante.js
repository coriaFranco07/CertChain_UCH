const Estudiante = artifacts.require("Estudiante");

contract("Estudiante", (accounts) => {
  let estudianteInstance;

  beforeEach(async () => {
    estudianteInstance = await Estudiante.new();
  });

  it("debería registrar un estudiante con estado válido", async () => {
    await estudianteInstance.addEstado("Activo");
    const tx = await estudianteInstance.registrarEstudiante(
      "Pepe",
      "Perez",
      "pepe.perez@mail.com",
      19990101,
      1
    );

    const { logs } = tx;
    assert.equal(logs.length, 1, "Debería haber emitido un evento");
    assert.equal(
      logs[0].event,
      "EstudianteRegistrado",
      "El evento emitido debería ser EstudianteRegistrado"
    );
    assert.equal(
      logs[0].args.id_estudiante.toNumber(),
      1,
      "El ID del estudiante debería ser 1"
    );

    const totalEstudiantes = await estudianteInstance.obtenerTotalEstudiantes();
    assert.equal(
      totalEstudiantes.toNumber(),
      1,
      "Debería haber un estudiante registrado"
    );
  });

  it("debería fallar al registrar un estudiante con estado inválido", async () => {
    try {
      await estudianteInstance.registrarEstudiante(
        "Pepe",
        "Perez",
        "pepe.perez@mail.com",
        19990101,
        99 // Estado inválido
      );
      assert.fail("La transacción no debería haber sido exitosa");
    } catch (error) {
      assert.include(
        error.message,
        "Estado no valido",
        "Debería arrojar un error de estado no válido"
      );
    }
  });

  it("debería actualizar la información de un estudiante", async () => {
    await estudianteInstance.addEstado("Activo");
    await estudianteInstance.registrarEstudiante(
      "Pepee",
      "Perez",
      "pepee.perez@mail.com",
      19990101,
      1
    );

    await estudianteInstance.actualizarInformacion(1, "Pepito", "Perezito");
    const estudiante = await estudianteInstance.obtenerEstudiante(1);

    assert.equal(estudiante.nombre, "Pepito", "El nombre debería ser Pepito");
    assert.equal(
      estudiante.apellido,
      "Perezito",
      "El apellido debería ser Perezito"
    );
  });

  it("debería cambiar el estado de un estudiante", async () => {
    await estudianteInstance.addEstado("Activo");
    await estudianteInstance.addEstado("Inactivo");

    await estudianteInstance.registrarEstudiante(
      "Juan",
      "Perez",
      "juan.perez@mail.com",
      19990101,
      1
    );

    await estudianteInstance.cambiarEstadoEstudiante(1, 2);
    const estudiante = await estudianteInstance.obtenerEstudiante(1);

    assert.equal(
      estudiante.id_estado.toNumber(),
      2,
      "El estado debería haber cambiado a 2 (Inactivo)"
    );
  });
});
