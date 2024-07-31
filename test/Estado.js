const Estado = artifacts.require("Estado");

contract("Estado", (accounts) => {
  let estadoInstance;

  beforeEach(async () => {
    estadoInstance = await Estado.new();
  });

  it("debería agregar un nuevo estado correctamente", async () => {
    const tx = await estadoInstance.addEstado("Activo");

    // Acceder a los logs del evento
    const { logs } = tx;

    assert.equal(logs.length, 1, "Debería haber emitido un evento");
    assert.equal(
      logs[0].event,
      "EstadoAdded",
      "El evento emitido debería ser EstadoAdded"
    );
    assert.equal(
      logs[0].args.id_estado.toString(), // Convertir a string para comparación
      "1", // Comparar como string
      "El ID del estado debería ser 1"
    );
    assert.equal(
      logs[0].args.nombre,
      "Activo",
      "El nombre del estado debería ser Activo"
    );

    const totalEstados = await estadoInstance.getTotalStates();
    assert.equal(totalEstados.toString(), "1", "Debería haber un estado");
  });

  it("debería obtener un estado por su ID", async () => {
    await estadoInstance.addEstado("Activo");
    const estado = await estadoInstance.getState(1);

    assert.equal(estado.id_estado.toString(), "1", "El ID del estado debería ser 1");
    assert.equal(estado.nombre, "Activo", "El nombre del estado debería ser Activo");
  });
});
