-- Schema design saved here: https://ondras.zarovi.cz/sql/demo/
-- Click "load", enter "sdc"

DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

\c listings;

CREATE TABLE listings (
  listing_id SERIAL PRIMARY KEY,
  owner_email VARCHAR(100),
  max_guests INT,
  price INT,
  service_fee INT,
  cleaning_fee INT,
  min_stay INT
);

-- This table will not be seeded with data; when users rent out listings, it will keep track of that data
CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  renter_email VARCHAR(100),
  check_in VARCHAR(20),
  check_out VARCHAR(20),
  total_cost INT,
  num_adults INT,
  num_children INT,
  num_infants INT,
  listing_id INT REFERENCES listings(listing_id)
);

CREATE TABLE listing_dates (
  id SERIAL PRIMARY KEY,
  _date VARCHAR(20),
  available INT,
  listing_id INT REFERENCES listings(listing_id),
  reservation_id INT REFERENCES reservations(reservation_id)
);

\COPY listings FROM 'listings.CSV' WITH CSV HEADER DELIMITER ',' NULL AS 'null';
\COPY listing_dates FROM 'listing_dates_1.CSV' WITH CSV HEADER DELIMITER ',' NULL AS 'null';
CREATE INDEX listing_dates_listing_id_idx ON listing_dates(listing_id);