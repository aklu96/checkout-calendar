-- Schema design saved here: https://ondras.zarovi.cz/sql/demo/
-- Click "load", enter "sdc"

DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

USE listings;

CREATE TABLE listings (
  listing_id SERIAL INT,
  max_guests INT,
  price DECIMAL,
  owner_email VARCHAR(100),
  cleaning_fee VARCHAR(20),
  service_fee VARCHAR(20),
  min_stay INT,
  PRIMARY KEY (listing_id),
);

CREATE TABLE reservations (
  reservation_id SERIAL INT,
  renter_email VARCHAR(100),
  check_in VARCHAR(20),
  check_out VARCHAR(20),
  total_cost DECIMAL,
  num_adults INT,
  num_children INT,
  num_infants INT,
  listing_id INT,
  PRIMARY KEY (reservation_id),
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id)
);

CREATE TABLE listing_dates (
  id SERIAL INT,
  `date` VARCHAR(20),
  available INT,
  listing_id INT,
  reservation_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(listing_id),
  FOREIGN KEY (reservation_id) REFERENCES reservaions(reservation_id)
);