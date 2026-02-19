CREATE DATABASE next_js_example_winter_2026_eu;

CREATE USER next_js_example_winter_2026_eu
WITH
  encrypted password 'next_js_example_winter_2026_eu';

GRANT ALL privileges ON database next_js_example_winter_2026_eu TO next_js_example_winter_2026_eu;

-- \connect next_js_example_winter_2026_eu
CREATE SCHEMA next_js_example_winter_2026_eu AUTHORIZATION next_js_example_winter_2026_eu;

CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(45),
  birth_date date NOT NULL
);

-- \dt
-- \d+ animals
INSERT INTO
  animals (
    first_name,
    type,
    accessory,
    birth_date
  )
VALUES
  (
    'Dennis',
    'goat',
    'expired library card',
    '2015-04-09'
  ),
  (
    'Monica',
    'owl',
    'laser pointer',
    '2018-11-02'
  ),
  (
    'Trevor',
    'iguana',
    'plastic fork collection',
    '2020-08-17'
  ),
  (
    'Sharon',
    'seal',
    'mysterious key labeled "DO NOT"',
    '2016-01-26'
  ),
  (
    'Paul',
    'pigeon',
    'tiny briefcase full of bread receipts',
    '2019-07-13'
  );

SELECT
  *
FROM
  animals;
