create table usuario (
  id serial primary key,
  nome_completo varchar(255) not null,
  email varchar(255) not null unique,
  senha varchar(255) not null,
  criado_em timestamp default current_timestamp
);

select id, nome_completo, email, criado_em from usuario;