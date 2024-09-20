CREATE TABLE restaurants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  option_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

CREATE TABLE user_choices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  option_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (option_id) REFERENCES options(id)
);
