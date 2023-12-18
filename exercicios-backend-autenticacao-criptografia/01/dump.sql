CREATE TABLE usuarios (
	id serial primary key,
  nome varchar(100) NOT NULL,
  email varchar(150) NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE pokemons (
	id serial primary key,
  usuario_id integer REFERENCES usuarios(id) NOT NULL,
  nome varchar(100) NOT NULL,
  habilidades text NOT NULL,
  imagem bytea,
  apelido varchar(50)
);