const express = require('express');
const directory = express.Router();
const db = require('../config/database');

directory.post("/", async (req, res, next) => {
    const { name, lastName, phone, mail, country } = req.body;

    if (name && lastName && phone && mail && country) {
        let query = "INSERT INTO empleados (name, lastName, phone, mail, country)";
        query += ` VALUES('${name}', '${lastName}', '${phone}', '${mail}', '${country}')`;

        const rows = await db.query(query);
        console.log(rows);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error..." });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos..." });
});

directory.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado eliminado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado..." })
});

directory.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { name, lastName, phone, mail, country } = req.body;

    if (name && lastName && phone && mail && country) {
        let query = `UPDATE empleados SET name='${name}',lastName='${lastName}',`;
        query += `phone='${phone}',mail='${mail}',country='${country}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error..." });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos..." });
});

directory.patch("/:id([0-9]{1,3})", async (req, res, next) => {

    if (req.body.name) {
        let query = `UPDATE empleados SET name='${req.body.name}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error..." });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos..." })
});

directory.get('/', async (req, res, next) => {
    const profy = await db.query("SELECT * FROM empleados",);
    return res.status(200).json({ code: 200, message: profy });
});

directory.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 5) {
        const profy = await db.query("SELECT * FROM empleados WHERE id = " + id + ";",);
        return res.status(200).json({ code: 200, message: profy });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

directory.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const profy = await db.query("SELECT * FROM empleados WHERE name = '" + name + "';",);
    if (profy.length > 0) {
        return res.status(200).json({ code: 200, message: profy });
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" });
});

module.exports = directory;