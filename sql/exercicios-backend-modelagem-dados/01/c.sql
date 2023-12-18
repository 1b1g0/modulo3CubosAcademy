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
