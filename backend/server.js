const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 10000;
const socioRouter = require('./routes/socioRoutes');
const reportRouter = require('./routes/reportRoutes');
const path = require('path'); // Asegúrate de importar path
const os = require('os'); 

const allowedOrigins = [
  'http://localhost:3000', // Desarrollo en localhost
  'https://servicios-multiples-1pch.onrender.com', // Producción
  'http://10.10.14.101:3000',
  'http://10.10.14.128:3000'
];

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json()); // Asegúrate de tener esto para que Express pueda analizar el cuerpo JSON
app.use('/api', socioRouter);
app.use('/api', reportRouter);

app.listen(port, '0.0.0.0', () => {
    console.log('Servidor escuchando en port:', port);
})


module.exports = app;
