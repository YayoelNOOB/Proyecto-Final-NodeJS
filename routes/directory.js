const express = require('express');
const directory = express.Router();
const db = require('../config/database');

directory.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

directory.get('/', async (req, res, next) => {
    const profy = await db.query("SELECT * FROM empleados", );
    return res.status(200).json(profy);
});

directory.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id >= 0 && id <= 5) {
        const profy = await db.query("SELECT * FROM empleados WHERE id = " + id + ";", );
        return res.status(200).json(profy);
    }
    return res.status(404).send("Empleado no encontrado");
});

directory.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const profy = await db.query("SELECT * FROM empleados WHERE name = '" + name + "';", );
    if (profy.length > 0) {
        return res.status(200).json(profy);
    }
    return res.status(404).send("Empleado no encontrado");
});

module.exports = directory;