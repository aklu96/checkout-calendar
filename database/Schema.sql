DROP DATABASE IF EXISTS listings;

CREATE DATABASE listings;

USE listings;

CREATE TABLE listings (
  listing_id INT GENERATED ALWAYS AS IDENTITY,
  max_guests INT,
  price DECIMAL,
  owner_email VARCHAR(100),
  cleaning_fee VARCHAR(20),
  service_fee VARCHAR(20),
  min_stay INT,
  PRIMARY KEY (id),
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT,
  renter_email VARCHAR(100),
  check_in DATE,
  check_out DATE,
  total_cost DECIMAL,
  num_adults INT,
  num_children, INT,
  num_infants INT,
  listing_id INT,
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);