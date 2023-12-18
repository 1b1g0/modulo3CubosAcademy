/* a) */
INSERT INTO pedidos
(cliente_cpf, vendedor_cpf)
VALUES ('80371350042', '28007155023');

INSERT INTO itens_do_pedido
(pedido_id, quantidade, produto_id)
VALUES 
(1, 1, 1),
(1, 1, 10),
(1, 6, 11),
(1, 1, 15),
(1, 5, 2);

-- atualizando o valor vazio
UPDATE pedidos
SET valor = ( 
 SELECT SUM(pr.preco * i.quantidade)
 FROM itens_do_pedido i
 INNER JOIN produtos pr
 ON i.produto_id = pr.id
)
WHERE id = 1;
/* Checando o resultado
SELECT sum(pr.preco * i.quantidade)
FROM itens_do_pedido i
INNER JOIN produtos pr
ON i.produto_id = pr.id;
*/

/* ATUALIZAÇÃO DO ESTOQUE */
-- att estoque p_id = 1
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 1 AND produto_id = 1)
)
WHERE id = 1;

-- att estoque p_id = 10
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 1 AND produto_id = 10)
)
WHERE id = 10;

-- att estoque p_id = 11
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 1 AND produto_id = 11)
)
WHERE id = 11;

-- att estoque p_id = 15
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 1 AND produto_id = 15)
)
WHERE id = 15;

-- att estoque p_id = 2
UPDATE produtos
SET quantidade_em_estoque = (
    (produtos.quantidade_em_estoque)
    -
    (SELECT quantidade
    FROM itens_do_pedido
    WHERE pedido_id = 1 AND produto_id = 2)
)
WHERE id = 2;
-- fim a)
