BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash varchar(200) NOT NULL,
    email text UNIQUE NOT NULL
);

COMMIT;