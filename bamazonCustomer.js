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
  start();
});

function displayItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + "\nProduct Name: " + res[i].product_name + "\nPrice: $" + res[i].price);
    }
    console.log("-----------------------------------");
  });
}


// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();

// var purchaseQuantity = process.argv[3]

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
    var unitsWanted = user.productUnits;
    var product = user.productID;

    if (unitsWanted > units) {
      console.log("Insufficient quantity!");
    }
    else {
      //reduce quantity in database by unitsWanted
      updateQuantity();
    }
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