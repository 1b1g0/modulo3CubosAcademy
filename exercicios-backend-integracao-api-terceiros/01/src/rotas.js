const express = require('express');
const roteador = express();
const { buscarEmpresa } = require('./controlador.js');

roteador.get('/empresas', buscarEmpresa);

module.exports = roteador;
