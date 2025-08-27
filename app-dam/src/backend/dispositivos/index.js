const express = require('express')
const routerDispositivos = express.Router()
var pool = require('../mysql-connector')

// 1. Obtener lista de todos los dispositivos
routerDispositivos.get('/dispositivos', function(req, res) {
    pool.query('SELECT * FROM Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400)
            return
        }
        res.send(result).status(200)
    })
})

// 2. Obtener detalle de un dispositivo con su última medición
routerDispositivos.get('/dispositivos/:id', function (req, res) {
    let id = req.params.id;

    const query = `
    SELECT d.dispositivoId, d.nombre, d.ubicacion, d.electrovalvulaId,
    m.medicionId, m.fecha, m.valor
    FROM Dispositivos d
    LEFT JOIN Mediciones m ON d.dispositivoId = m.dispositivoId
    WHERE d.dispositivoId = ?
    ORDER BY m.fecha DESC
    LIMIT 1;
    `;

    pool.query(query, [id], function (err, result) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length === 0) {
            res.status(404).send({ message: "Dispositivo no encontrado" });
            return;
        }

        res.status(200).send(result[0]);
    });
});

// 3. Obtener todas las mediciones de un dispositivo (historial)
routerDispositivos.get('/dispositivos/:id/mediciones', function (req, res) {
    let id = req.params.id;

    const query = `
    SELECT m.medicionId, m.fecha, m.valor
    FROM Mediciones m
    WHERE m.dispositivoId = ?
    ORDER BY m.fecha DESC;
    `;

    pool.query(query, [id], function (err, result) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length === 0) {
            res.status(404).send({ message: "No hay mediciones para este dispositivo" });
            return;
        }

        res.status(200).send(result);
    });
});

// 4. Abrir o cerrar válvula de un dispositivo y registrar log de riego + medición
routerDispositivos.post('/dispositivos/:id/valvula', function (req, res) {
    let dispositivoId = req.params.id;

    // Paso 1: obtener el electrovalvulaId
    const queryDispositivo = `
    SELECT d.electrovalvulaId
    FROM Dispositivos d
    WHERE d.dispositivoId = ?;
    `;

    pool.query(queryDispositivo, [dispositivoId], function (err, result) {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length === 0) {
            res.status(404).send({ message: "Dispositivo no encontrado" });
            return;
        }

        const electrovalvulaId = result[0].electrovalvulaId;

        // Paso 2: obtener último estado en Log_Riegos
        const queryUltimoEstado = `
        SELECT apertura 
        FROM Log_Riegos 
        WHERE electrovalvulaId = ? 
        ORDER BY fecha DESC 
        LIMIT 1;
        `;

        pool.query(queryUltimoEstado, [electrovalvulaId], function (err2, result2) {
            if (err2) {
                res.status(400).send(err2);
                return;
            }

            let estadoActual = result2.length > 0 ? result2[0].apertura : 0;
            let nuevoEstado = estadoActual === 1 ? 0 : 1;

            // Paso 3: insertar nuevo registro en Log_Riegos
            const queryInsertRiego = `
            INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId)
            VALUES (?, NOW(), ?);
            `;

            pool.query(queryInsertRiego, [nuevoEstado, electrovalvulaId], function (err3, result3) {
                if (err3) {
                    res.status(400).send(err3);
                    return;
                }

                // Paso 4: generar valor de humedad simulado y guardarlo en Mediciones
                let humedad = Math.floor(Math.random() * 100);
                const queryInsertMedicion = `
                INSERT INTO Mediciones (dispositivoId, valor, fecha)
                VALUES (?, ?, NOW());
                `;

                pool.query(queryInsertMedicion, [dispositivoId, humedad], function (err5, result5) {
                    if (err5) {
                        res.status(400).send(err5);
                        return;
                    }

                    res.status(200).send({
                        message: nuevoEstado === 1 ? "Válvula abierta" : "Válvula cerrada",
                        electrovalvulaId: electrovalvulaId,
                        nuevoEstado: nuevoEstado,
                        nuevaMedicion: { valor: humedad, fecha: new Date() }
                    });
                });
            });
        });
    });
});

module.exports = routerDispositivos