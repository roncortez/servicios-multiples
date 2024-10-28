const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 10000;
const socioRouter = require('./routes/socioRoutes');

app.use(cors());

app.use('/api', socioRouter);

app.listen(port, () => {
    console.log('Servidor escuchando en port:', port);
})


module.exports = app;