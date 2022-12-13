const express = require('express');
const morgan = require('morgan');
const app = express();
const directory = require('./routes/directory');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al directorio");
});

app.use("/directory", directory);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
});