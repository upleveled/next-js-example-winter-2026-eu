CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(45),
  birth_date date NOT NULL
);

\dt

\d+ animals

INSERT INTO
  animals ( first_name, type, accessory, birth_date)
VALUES
  ( 'Dennis', 'goat', 'expired library card', '2015-04-09');

SELECT * FROM animals;
