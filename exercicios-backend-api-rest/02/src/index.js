const express = require('express');
const app = express();
const roteador = require('./roteador');
const port = 3000;

app.listen(port);
app.use(express.json());
app.use(roteador);