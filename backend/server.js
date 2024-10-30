const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 10000;
const socioRouter = require('./routes/socioRoutes');


const allowedOrigins = [
  'http://localhost:3000', // Desarrollo en localhost
  'https://servicios-multiples-1pch.onrender.com' // Producción
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

app.listen(port, () => {
    console.log('Servidor escuchando en port:', port);
})


module.exports = app;
