var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
});
  
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // connection.end();
  displayItems();
  setTimeout(start, 10);
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nPrice: $" + res[i].price + "\n---------------");
    }
  });
};

function start() {
  inquirer.prompt([
    {
      type: "input",
      name: "productID",
      message: "What is the id of the product you would like to purchase?"
    },
    {
      type: "input",
      name: "productUnits",
      message: "How many units would you like?"
    }
  ]).then(function(user) {
    var productWanted = user.productID;
    var unitsWanted = parseInt(user.productUnits);
    connection.query("SELECT * FROM products WHERE ?", [{item_id: productWanted}], function(err, res) {
      console.log(res);
      console.log(res[0].stock_quantity);
      if (unitsWanted > res[0].stock_quantity) {
        console.log("Insufficient quantity!");
        start();
      }
      else {
        //reduce quantity in database by unitsWanted
        updateQuantity();
        console.log("Your purchase total is $" + res[0].price);
      }

      function updateQuantity() {
        console.log("Updating quantity");
        connection.query("UPDATE bamazon.products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
          [unitsWanted, productWanted],
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " quantity updated\n");
          }
        )
      };
    });
  });
};

