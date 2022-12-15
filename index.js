//Dependencias
const express = require('express');
const morgan = require('morgan');
const app = express();
//Routes
const directory = require('./routes/directory');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);
app.use("/user", user);
app.use("/directory", directory);
app.use(auth);
app.use(notFound);

app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL no encontrada" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
});