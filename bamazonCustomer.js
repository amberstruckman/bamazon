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
  console.log("2");
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  // console.log("3");
  // inquirer
  //   .prompt({
  //     name: "productID",
  //     type: "input",
  //     message: "Enter in the productID of the product you'd like to purchase"
    // }//,
    // {
    //     name: "quanity",
    //     type: "input",
    //     message: "How many would you like to purchase?"
    // }

  
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
   
      var choiceArray = [];
      for (var i = 0; i < results.length; i++) {
        choiceArray.push(results[i].item_name);
      }


    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
         choices: choiceArray,
          
          message: "Enter in the item_name of the product you'd like to purchase"
        },
        {
          name: "amount",
          type: "input",
          message: "How many would you like?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
      
        // determine if enough stock
        if (chosenItem.amount < parseInt(answer.amount)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                //stock quanity subtracted????
              stock_quanity: answer.amount
              },
              {
                id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Order Successful!");
              start();
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
// }
    }