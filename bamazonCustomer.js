var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "anything1",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
   if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
    
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
   
      var choiceArray = [];
      for (var i = 0; i < results.length; i++) {
        choiceArray.push({
          name: "item_id: " + results[i].item_id + " product_name: " + results[i].product_name + " price: " + results[i].price,
          value: results[i]

        });
        
      }

    function placeOrder (chosen, amount) {
      var total = amount * chosen.price;
      console.log("Your total amount is: $" + parseFloat(total));
    }

      

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
         choices: choiceArray,
          
          message: "Enter in the number of the product you'd like to purchase"
        },
        {
          name: "amount",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        var amount = parseInt(answer.amount);
       // console.log("in");
        //console.log(JSON.stringify(answer));
        var chosenItem = answer.choice;
        //console.log(JSON.stringify(chosenItem));
        // get the information of the chosen item
        // var chosenItem;
        // for (var i = 0; i < results.length; i++) {
        //   if (results[i].product_name === answer.choice) {
        //     chosenItem = results[i];
        //   }
        // }
       // console.log(JSON.stringify(chosenItem));
        // determine if enough stock
       // console.log(chosenItem.stock_quantity + " vs " + amount);
        if (chosenItem.stock_quantity >= amount) {
          
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
             
              stock_quantity: chosenItem.stock_quantity - amount
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order Successful!");
              placeOrder(chosenItem, amount);
              //start();
            }
          );
        }
        else {
          // not enough stock
          console.log("Insufficient quantity!.");
          start();
        }
      });
  });
 // console.log("end start");
// }
    }