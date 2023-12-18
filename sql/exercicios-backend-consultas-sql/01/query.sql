-- 1
select compositor, id from musicas;
-- 2
select composicao, tempo from musicas where tempo > 240;
-- 3
select id, compositor, composicao from musicas where id > 47 and id < 123;
-- 4
select * from musicas where compositor IS NOT NULL and tempo < 301 and compositor <> 'Bach';
-- 5
select composicao, tempo from musicas where compositor = 'Mozart' OR compositor = 'Bach';
-- 6
select * from musicas order by id desc;
-- 7
select * from musicas order by tempo desc;
-- 8
select * from musicas order by tempo asc limit 5;
-- 9
select * from musicas order by tempo desc limit 10;
-- 10
select * from musicas order by tempo asc offset 5 limit 10;
-- 11
select * from musicas offset 40 limit 10;
-- 12
select * from msuicas offset 12*5 limit 12;
-- 13
select compositor from musicas distinct where compositor is not null;
-- 14
select distinct compositor, composicao from musicas where compositor is not null order by compositor;
-- 15
select * from musicas where compositor like 'Bra%';
-- 16 
select * from musicas where ritmo like '%troppo';
-- 17
select * from musicas where composicao ilike '%quartet%';
-- 18
select * from musicas where composicao not ilike '%quintet%';
-- testinho
select * from musicas where composicao ilike '%quintet%';