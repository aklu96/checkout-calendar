-- Schema design saved here: https://ondras.zarovi.cz/sql/demo/
-- Click "load", enter "sdc"

DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

USE listings;

CREATE TABLE listings (
  listing_id SERIAL PRIMARY KEY,
  owner_email VARCHAR(100),
  max_guests INT,
  price INT,
  service_fee INT,
  cleaning_fee INT,
  min_stay INT
);

CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  renter_email VARCHAR(100),
  check_in VARCHAR(20),
  check_out VARCHAR(20),
  total_cost INT,
  num_adults INT,
  num_children INT,
  num_infants INT,
  listing_id INT FOREIGN KEY REFERENCES listings(listing_id)
);

CREATE TABLE listing_dates (
  id SERIAL PRIMARY KEY,
  _date VARCHAR(20),
  available INT,
  listing_id INT FOREIGN KEY REFERENCES listings(listing_id),
  reservation_id INT FOREIGN KEY REFERENCES reservations(reservation_id)
);

\COPY listings FROM '/Users/alexklyuev/Documents/Coding/Hack Reactor/Projects/SDC/checkout-calendar/database/CSV/listings.csv' WITH CSV HEADER DELIMITER ',';