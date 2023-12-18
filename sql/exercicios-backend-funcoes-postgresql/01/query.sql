-- 1
select count(medicamento) from farmacia;
-- 2
select min(idade) from usuarios;
-- 3
select max(idade) from usuarios;
-- 4
select round(avg(idade)) from usuarios where idade > 17;
-- 5
select sum(estoque) from farmacia where categoria = 'blue' or categoria = 'black';
-- 6 - soma do estoque por categorias de medicamentos.
select distinct categoria, sum(estoque) from farmacia
where categoria is not null
group by categoria;

-- 7
select sum(estoque) from farmacia where categoria is null;
-- 8
select distinct count(medicamento) from farmacia where categoria is null;
-- 9
select concat(medicamento, ' ', '(', categoria, ')') from farmacia where categoria is not null;
-- 10 COALESCE preencher campo que é nulo, pode ser com outro campo, último param é a str filler.
select concat(id, ' - ', medicamento, ' (', coalesce(categoria, 'sem categoria'), ')' )
from farmacia;
-- 11
select nome, idade, cadastro::date from usuarios where cadastro like '2020%';
-- 12
select nome, idade, email, age(cast(cadastro as timestamp)) as tempo from usuarios where idade < 18;
-- 13
select nome, idade, email, age(cast(cadastro as date)) as tempo from usuarios where idade > 59;
-- 14
select distinct categoria, sum(estoque) from farmacia where categoria is not null group by categoria;
-- 15
select distinct idade, count(id) from usuarios where idade > 17 group by idade;
-- 16
select distinct categoria, sum(estoque) from farmacia group by categoria;