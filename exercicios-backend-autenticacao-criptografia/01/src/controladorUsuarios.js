const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./conexao.js');
const senhaJwt = require('./senhaJwt.js');
const erroServidor = { mensagem: "Erro no servidor" };

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    //console.log(nome, email, senha);
    const queryInserir = `
    INSERT INTO usuarios
    (nome, email, senha)
    VALUES
    ($1, $2, $3)
    RETURNING nome, email;`;

    const queryChecarEmail = `
    SELECT email FROM usuarios
    WHERE email = $1;`;
    
    try {
        const checarEmail = await pool.query(queryChecarEmail, [email]);
        if (checarEmail.rowCount > 0) {
            return res.status(400).json({"mensagem": "Email já cadastrado."})
        }

        const senhaCript = await bcrypt.hash(senha, 10);
        const resultadoInserir = await pool.query(queryInserir,[nome, email, senhaCript]);
        return res.status(201).json(resultadoInserir.rows);
    } catch(e) {
        return res.status(500).json(erroServidor);
    }
};

const loginUsuario = async (req, res) => {
    const mensagemErroAuth = {
        "mensagem": "Email ou Senha inválidos."
    };
    const { email, senha } = req.body;
    const queryUsuario = `
    SELECT * FROM usuarios
    WHERE email = $1;`;
    
    try {
        const usuario = await pool.query(queryUsuario,[email]);
        if (usuario.rowCount < 1){
            return res.status(400).json(mensagemErroAuth);
        };

        const validarSenha = await bcrypt.compare(senha, usuario.rows[0].senha);
        if (!validarSenha) {
            return res.status(400).json(mensagemErroAuth);
        };
        
        const token = jwt.sign({id: usuario.rows[0].id}, senhaJwt, {expiresIn: '2h'});

        // essa sintaxe remove a senha, e todo o resto é um obj salvo em usuarioLogado.
        const {senha: _, ...usuarioLogado} = usuario.rows[0];
        
        return res.json({usuario: usuarioLogado, token});

    } catch (e) {
        return res.status(500).json(erroServidor);
    }

};

const listarUsuarios = async (req, res) => {
    const query = 'SELECT * FROM usuarios;';
    try{
        const resultado = await pool.query(query);
        //console.log(req.usuario)
        return res.json(resultado.rows);
    } catch(e) {
        return res.status(400).json(e)
    }
};

const cadastrarPokemon = async (req, res) => {

    const {nome, apelido, habilidades, imagem} = req.body;
    if (!nome || !apelido || !habilidades || !imagem){
        res.status(400).json({ Mensagem: "Input vazio." });
    };

    const usuarioId = req.usuario.id;
    const queryCadastro = `
        INSERT INTO pokemons (usuario_id, nome, habilidades, imagem, apelido)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    try{
        const cadastrarPoke =  await pool.query(queryCadastro,[usuarioId, nome, habilidades, imagem, apelido]);
    
        return res.status(201).json(cadastrarPoke.rows[0])
    } catch (e) {
        return res.status(500).json({mensage: e.message});
    }
};

const atualizarApelido = async (req, res) => {
    const { id } = req.params;
    const { apelido:novoVulgo } = req.body;
    const queryAtualizar = `UPDATE pokemons SET apelido = $1 WHERE id = $2;`;

    try {
        const AttPoke = await pool.query(queryAtualizar,[novoVulgo, id]);
        return res.status(200).json(AttPoke)

    } catch (e) {
        return res.status(500).json({mensagem: e.message})        
    }
};

const listarPokemonsUsuario = async (req, res) => {
    const { id:userId } = req.usuario;
    const queryPokemonsId = `SELECT * FROM pokemons WHERE usuario_id = $1;`;

    try {
        const pokes = (await pool.query(queryPokemonsId,[userId])).rows;

        return res.status(200).json(pokes);

    } catch (e) {
        return res.status(500).json({mensagem: e.message})
    }
};

const listarPokemonId = async (req, res) => {
    const { id:pokeId } = req.params;
    const { id:userId } = req.usuario;

    const querySelecionarPoke = `SELECT * FROM pokemons 
    WHERE id = $1 AND usuario_id = $2;`;

    try {
        const pokeSelecionado = (await pool.query(querySelecionarPoke,[pokeId,userId])).rows[0];
        return res.status(200).json(pokeSelecionado);
    } catch (e) {
        return res.status(500).json({mensagem: e.message});

    }
}; 

const deletarPokemonId = async (req, res) => {
    const { id:pokeId } = req.params;
    const { id:userId } = req.usuario;

    const queryDeletar = `DELETE FROM pokemons WHERE id = $1 AND usuario_id = $2;`;

    try {
        const deletar = await pool.query(queryDeletar,[pokeId,userId])
        return res.status(200).json();

    } catch (e) {
        return res.status(500).json({mensagem: e.message});
    }

};


module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    loginUsuario,
    cadastrarPokemon,
    atualizarApelido,
    listarPokemonsUsuario,
    listarPokemonId,
    deletarPokemonId
};
