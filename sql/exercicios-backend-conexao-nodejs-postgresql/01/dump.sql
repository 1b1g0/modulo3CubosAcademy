CREATE TABLE autores (
	id serial primary key,
    nome text NOT NULL,
    idade smallint
);

CREATE TABLE livros (
	id serial primary key,
  nome varchar(150) NOT NULL,
  genero varchar(50),
  editora varchar(150),
  data_publicacao date,
  id_autor int references autores(id)
);
