const express = require('express');
const app = express();
const { employee } = require('./directory.json');

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido al directorio");
});

app.get("/:directory/all", (req, res, next) => {
    res.status(200);
    res.send(employee);
});

app.get("/directory/:id([0-9]{1,3})", (req, res, next) =>{
    const id = req.params.id -1;
    if(id >= 0 && id <= 5){
        res.status(200);
        res.send(employee[req.params.id - 1]);
    }else{
        res.status(404);
        res.send("Empleado no encontrado");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
});