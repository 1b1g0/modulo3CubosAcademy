create table categorias (
    id serial primary key,
    nome varchar(50) not null
);

create table clientes (
    cpf char(11) unique not null,
    nomes varchar(150) not null
);

create table vendedores (
    cpf char(11) unique not null,
    nome varchar(150) not null
);

create table produtos (
    id serial primary key,
    nome varchar(100) not null,
    descricao text,
    preco integer not null,
    quantidade_em_estoque smallint,
    categoria_id integer references categorias(id)
);

create table pedidos (
    id serial primary key,
    valor integer not null,
    cliente_cpf char(11) references clientes(cpf),
    vendedor_cpf char(11) references vendedores(cpf)
);

create table itens_do_pedido (
    id serial primary key,
    pedido_id integer references pedidos(id),
    quantidade smallint not null,
    produto_id integer references produtos(id)
);

-- FIM CRIAÇÃO DAS TABELAS E RELAÇÕES.

insert into categorias (nome)
values
    ('frutas'),
    ('verduras'),
    ('massas'),
    ('bebidas'),
    ('utilidades');

INSERT INTO produtos (nome, descricao, preco, quantidade_em_estoque, categoria_id)
VALUES
    ('Mamão', 'Rico em vitamina A, potássio e vitamina C', 300, 123, 1),
    ('Maçã', 'Fonte de potássio e fibras.', 90, 34, 1),
    ('Cebola', 'Rico em quercetina, antocianinas, vitaminas do complexo B, C.', 50, 76, 2),
    ('Abacate', 'NÃO CONTÉM GLÚTEN.', 150, 64, 1),
    ('Tomate', 'Rico em vitaminas A, B e C.', 125, 88, 2),
    ('Acelga', 'NÃO CONTÉM GLÚTEN.', 235, 13, 2),
    ('Macarrão parafuso', 'Sêmola de trigo enriquecida com ferro e ácido fólico, ovos e corantes naturais', 690, 5, 3),
    ('Massa para lasanha', 'Uma reunião de família precisa ter comida boa e muita alegria.', 875, 19, 3),
    ('Refrigerante coca cola lata', 'Sabor original', 350, 189, 4),
    ('Refrigerante Pepsi 2l', 'NÃO CONTÉM GLÚTEN. NÃO ALCOÓLICO.', 700, 12, 4),
    ('Cerveja Heineken 600ml', 'Heineken é uma cerveja lager Puro Malte, refrescante e de cor amarelo-dourado', 1200, 500, 4),
    ('Agua mineral sem gás', 'Smartwater é água adicionado de sais mineirais (cálcio, potássio e magnésio) livre de sódio e com pH neutro.', 130, 478, 4),
    ('Vassoura', 'Pigmento, matéria sintética e metal.', 2350, 30, 5),
    ('Saco para lixo', 'Reforçado para garantir mais segurança', 1340, 90, 5),
    ('Escova dental', 'Faça uma limpeza profunda com a tecnologia inovadora', 1000, 44, 5),
    ('Balde para lixo 50l', 'Possui tampa e fabricado com material reciclado', 2290, 55, 5),
    ('Manga', 'Rico em Vitamina A, potássio e vitamina C', 198, 176, 1),
    ('Uva', 'NÃO CONTÉM GLÚTEN.', 420, 90, 1);

INSERT INTO clientes
(cpf, nomes)
VALUES
    ('80371350042', 'José Augusto Silva'),
    ('67642869061', 'Antonio Oliveira'),
    ('63193310034', 'Ana Rodrigues'),
    ('75670505018', 'Maria da Conceição');

INSERT INTO vendedores
(cpf, nome)
VALUES
    ('82539841031', 'Rodrigo Sampaio'),
    ('23262546003','Beatriz Souza Santos'),
    ('28007155023', 'Carlos Eduardo');


/* c)  */
INSERT INTO pedidos
(cliente_cpf, vendedor_cpf)
VALUES (
    (
      SELECT cpf 
      FROM clientes 
      WHERE nome ='Maria da Conceição'
    ),
    (
      SELECT cpf
      FROM vendedores
      WHERE nome ='Beatriz Souza Santos'
    )
   );

INSERT INTO itens_do_pedido
(pedido_id, quantidade, produto_id)
VALUES 
    (3, 1, 13),
    (3, 6, 12),
    (3, 5, 17);

-- atualizando o valor vazio
UPDATE pedidos
SET valor = ( 
 SELECT SUM(pr.preco * i.quantidade)
 FROM itens_do_pedido i
 INNER JOIN produtos pr
 ON i.produto_id = pr.id
)
WHERE id = 3;


/* ATUALIZAÇÃO DO ESTOQUE */
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 3 AND produto_id = 13)
)
WHERE id = 13;


UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 3 AND produto_id = 12)
)
WHERE id = 12;

UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 3 AND produto_id = 17)
)
WHERE id = 17;