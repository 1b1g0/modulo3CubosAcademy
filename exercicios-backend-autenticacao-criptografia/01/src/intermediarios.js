
// Bearer {token}
const jwt = require('jsonwebtoken');
const senhaJwt = require('./senhaJwt.js');
const pool = require('./conexao.js');
const erroNaoAutorizado = { mensagem: "Não autorizado." };

const validarUsuario = async(req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({mensagem: "Não autorizado."})
    };

    const token = authorization.split(' ')[1];
    const { id } = jwt.verify(token, senhaJwt);
    try {
        
        const usuario = await pool.query( 'SELECT * FROM usuarios WHERE id = $1', [id]);

        if (usuario.rowCount < 1){
            return res.status(401).json(erroNaoAutorizado);
        }
        req.usuario = usuario.rows[0];
        next();
        
    } catch (e) {
        return res.status(401).json(erroNaoAutorizado);
    }
};

module.exports = validarUsuario;
