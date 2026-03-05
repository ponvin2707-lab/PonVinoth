CREATE DATABASE IF NOT EXISTS bus_tracking;

USE bus_tracking;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS buses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bus_number VARCHAR(50),
  driver_id INT,
  FOREIGN KEY (driver_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bus_id INT,
  lat DOUBLE,
  lng DOUBLE,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bus_id) REFERENCES buses(id)
);

INSERT INTO users (name, email, password, role)
VALUES ("Demo Driver", "driver@college.edu", "demo123", "driver")
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO buses (id, bus_number, driver_id)
VALUES (1, "BUS-01", 1)
ON DUPLICATE KEY UPDATE bus_number = VALUES(bus_number), driver_id = VALUES(driver_id);
