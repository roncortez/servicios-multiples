const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 10000;

// Importar rutas
const loginRouter = require('./routes/loginRoutes');
const socioRouter = require('./routes/socioRoutes');
const reportRouter = require('./routes/reportRoutes');
const talentoHumanoRouter = require('./routes/talentoHumano/routes');

// Configuración de CORS
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));

app.use(express.json());

// Configurar rutas de API
app.use('/api', loginRouter);
app.use('/api', socioRouter);
app.use('/api', reportRouter);
app.use('/api', reportRouter);
app.use('/api', talentoHumanoRouter);


// Configurar frontend
const reactBuildPath = path.join(__dirname, 'build');
app.use(express.static(reactBuildPath));

// Manejo de rutas no definidas en la API
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).send('API route not found');
    }
    const indexPath = path.join(reactBuildPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(500).send('Frontend build not found');
    }
    res.sendFile(indexPath);
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log('Servidor escuchando en port:', port);
});

module.exports = app;
