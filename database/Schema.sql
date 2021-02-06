-- Schema design saved here: https://ondras.zarovi.cz/sql/demo/
-- Click "load", enter "sdc"

DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

USE listings;

CREATE TABLE listings (
  listing_id SERIAL PRIMARY KEY,
  max_guests INT,
  price DECIMAL,
  owner_email VARCHAR(100),
  cleaning_fee VARCHAR(20),
  service_fee VARCHAR(20),
  min_stay INT
);

CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  renter_email VARCHAR(100),
  check_in VARCHAR(20),
  check_out VARCHAR(20),
  total_cost DECIMAL,
  num_adults INT,
  num_children INT,
  num_infants INT,
  listing_id INT FOREIGN KEY REFERENCES listings(listing_id)
);

CREATE TABLE listing_dates (
  id SERIAL PRIMARY KEY,
  `date` VARCHAR(20),
  available INT,
  listing_id INT FOREIGN KEY REFERENCES listings(listing_id),
  reservation_id INT FOREIGN KEY REFERENCES reservations(reservation_id)
);