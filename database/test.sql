DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

\c test;

CREATE TABLE listing_dates (
  id SERIAL PRIMARY KEY,
  _date VARCHAR(20),
  available INT,
  listing_id INT,
  reservation_id INT
);