const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Reservas Hoteleras',
            version: '1.0.0',
            description: 'Una API para gestionar reservas en hoteles',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor local',
            },
            // Puedes agregar más servidores aquí si tienes diferentes entornos (producción, desarrollo, etc.)
        ],
    },
    apis: ['./routes/*.js'], // Rutas de tus controladores
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
