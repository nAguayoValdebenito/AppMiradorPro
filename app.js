const express = require('express');
const cors = require('cors');
const database = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

// Obtener lista de gastos comunes
app.get('/gastos_comunes', (req, res) => {
    const consulta = 'SELECT * FROM gastos_departamento';

    database.query(consulta, (error, resultados) => {
        if (error) {
            console.error("Error al consultar la base de datos:", error);
            res.status(500).send("Error en el servidor");
            return;
        }
        res.json(resultados);
    });
});

// Agregar un nuevo gasto común
app.post('/crear_gasto', (req, res) => {
    const { idDepartamento, mes, anio, monto, pagado } = req.body;

    if (!idDepartamento || !mes || !anio || !monto || pagado === undefined) {
        console.error("Faltan campos obligatorios");
        res.status(400).send("Faltan campos obligatorios");
        return;
    }

    const consulta = 'INSERT INTO gastos_departamento (idDepartamento, mes, anio, monto, pagado) VALUES (?, ?, ?, ?, ?)';

    database.query(consulta, [idDepartamento, mes, anio, monto, pagado], (error, resultados) => {
        if (error) {
            console.error("Error al agregar el gasto común:", error);
            res.status(500).send("Error en el servidor");
            return;
        }
        console.log("Gasto agregado correctamente");
        res.status(201).send("Gasto agregado exitosamente");
    });
});

// Actualizar el estado de pago
app.post('/actualizar_pago', (req, res) => {
    const { idDepartamento, mes, anio, monto, pagado } = req.body;

    if (!idDepartamento || !mes || !anio || !monto || pagado === undefined) {
        console.error("Faltan campos obligatorios");
        res.status(400).send("Faltan campos obligatorios");
        return;
    }

    const consulta = 'UPDATE gastos_departamento SET monto = ?, pagado = ? WHERE idDepartamento = ? AND mes = ? AND anio = ?';

    database.query(consulta, [monto, pagado, idDepartamento, mes, anio], (error, resultados) => {
        if (error) {
            console.error("Error al actualizar el pago:", error);
            res.status(500).send("Error en el servidor");
            return;
        }

        if (resultados.affectedRows === 0) {
            res.status(404).send("No se encontró el registro para actualizar");
            return;
        }

        console.log("Pago actualizado correctamente");
        res.status(200).json({ mensaje: "Pago actualizado exitosamente" });
    });
});

// Configuración del puerto
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
