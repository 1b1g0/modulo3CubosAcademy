/* b) */
INSERT INTO pedidos
(cliente_cpf, vendedor_cpf)
VALUES (
    (
      SELECT cpf 
      FROM clientes 
      WHERE nome ='Ana Rodrigues'
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
    (2, 10, 17),
    (2, 3, 18),
    (2, 5, 1),
    (2, 10, 5),
    (2, 2, 6);

-- atualizando o valor vazio
UPDATE pedidos
SET valor = ( 
 SELECT SUM(pr.preco * i.quantidade)
 FROM itens_do_pedido i
 INNER JOIN produtos pr
 ON i.produto_id = pr.id
)
WHERE id = 2;
/* Checando o resultado
SELECT sum(pr.preco * i.quantidade)
FROM itens_do_pedido i
INNER JOIN produtos pr
ON i.produto_id = pr.id;
*/

/* ATUALIZAÇÃO DO ESTOQUE */
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 2 AND produto_id = 17)
)
WHERE id = 17;

UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 2 AND produto_id = 18)
)
WHERE id = 18;

UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 2 AND produto_id = 1)
)
WHERE id = 1;

UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 2 AND produto_id = 5)
)
WHERE id = 5;

UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 2 AND produto_id = 6)
)
WHERE id = 6;
-- fim b)
