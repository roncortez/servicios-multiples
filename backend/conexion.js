const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();

const ipControladora = '192.168.1.127';
const puerto = 502;
const direccionDO = 1; // Dirección del relé 0

async function alternarBarrera0() {
    try {
        await client.connectTCP(ipControladora, { port: puerto, rtuOverTcp: true });
        console.log("Conexión exitosa a la controladora AR-716-E16.");
        client.setID(1);
        client.setTimeout(2000);

        for (let i = 0; i < 3; i++) {
            console.log(`Ciclo ${i + 1}: Cambiando el estado de la barrera 0...`);
            const estadoActual = await client.readCoils(direccionDO, 1);
            const nuevoEstado = !estadoActual.data[0]; // Invertir estado
            console.log(`Cambiando el estado de la barrera a: ${nuevoEstado ? "ON" : "OFF"}`);
            await client.writeCoil(direccionDO, nuevoEstado);

            const estadoVerificado = await client.readCoils(direccionDO, 1);
            console.log(`Nuevo estado de la barrera: ${estadoVerificado.data[0] ? "ON" : "OFF"}`);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Espera 2 segundos
        }
    } catch (error) {
        console.error("Error durante la prueba de la barrera:", error.message);
    } finally {
        client.close(() => {
            console.log("Conexión cerrada.");
        });
    }
}

// Alternar estado de la barrera 0
alternarBarrera0();
