const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

dotenv.config();

const routes = require('./routes/routes');

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});


app.use(routes);