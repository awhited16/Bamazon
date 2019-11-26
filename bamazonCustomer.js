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
    var product = user.productID;
    var unitsWanted = user.productUnits;
    connection.query("SELECT * FROM products WHERE ?", [{item_id: product}], function(err, res) {
    
      if (unitsWanted > products.units) {
        console.log("Insufficient quantity!");
      }
      else {
        //reduce quantity in database by unitsWanted
        updateQuantity();
      }
    });
  });
};

function updateQuantity() {
  console.log("Updating quantity");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        id: product
      },
      {
        stock_quantity: stock_quantity-unitsWanted
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " quantity updated\n");
    }
  )};