const express = require('express');
const app = express();
const roteador = require('./rotas');

app.use(express.json());
app.use(roteador);
app.listen(3000);