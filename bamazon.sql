DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", "500.95", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tablet", "Electronics", "350.55", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mixer", "Kitchen", "312.88", "7");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whisk", "kitchen", "5.25", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Home", "75.44", "3");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Home", "15.00", "17");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BabyDoll", "Toys", "7.95", "10");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dino", "Toys", "4.25", "15");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Car", "Toys", "4.95", "21");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ScienceKit", "Toys", "25.15", "3");

