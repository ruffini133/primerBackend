const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./swaggerConfig'); // Agrega esta línea para importar swaggerConfig.js
const reservaRoutes = require('./routes/reservaRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/reservas', reservaRoutes);

// Integración de Swagger
swaggerConfig(app); // Usa la función importada aquí

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
