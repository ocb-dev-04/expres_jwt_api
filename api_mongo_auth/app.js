const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// conect to db
mongoose.connect(
    process.env.DB_CONNECT, 
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log('Connected to db!!')
);

// swagger info
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Swagger',
            description: 'ShopApp API',
            version: '1.0.0',
            contact: {
                name: 'Oscar Chavez'
            }
        },
        servers: `${HOST}/${PORT}`,
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'auth-token',
                description: "",
            }
        }
    },
    basedir: __dirname,
    apis: ['app.js'] //Path to the API handle folder
};
// expressSwagger(options);
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// body parser
app.use(express.json());

// routes
const authRoutes = require('./src/routes/auth');
const productsRoutes = require('./src/routes/products');
const cartRoutes = require('./src/routes/cart');

// routes middlewares
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/cart', cartRoutes);

// start up
app.listen(PORT, HOST);
console.log(`Server is up on http://${HOST}:${PORT}`);