Create database bamazon;

Use bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spooky sign", "home decor", 12, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fake pumpkin", "home decor", 7, 46);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("adult size halloween costume", "clothing", 45, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog halloween costume", "pets", 24, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat halloween costume", "pets", 24, 68);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candy corn", "candy", 4, 205);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bag of candy", "candy", 18, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("spider web decorations", "home decor", 16, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kids halloween costume", "kids", 35, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ghost decorations", "home decor", 38, 145);


