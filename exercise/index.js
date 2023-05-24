require("dotenv").config();
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "users",
  user: "postgres",
  password: process.env.DATABASE_PASSWORD,
});
app.use(express.json());

// GET orders
app.get("/get_orders", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database", err);
      res.status(500).send("Internal service error");
    }
    client.query(`SELECT * FROM orders;`, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Post Orders
app.post("/create_orders", (req, res) => {
  const ordersName = req.body.ordersName;
  console.log(ordersName);

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO orders (orders_name) VALUES ($1);`;
    const values = [ordersName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//GET orders by ID
app.get("/get_orders/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT * FROM orders WHERE id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//PUT by ID (update)
app.put("/update_orders/:id", (req, res) => {
  const { id } = req.params;
  const ordersName = req.body.ordersName;
  const newOrders = req.body.newOrders;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update orders SET orders_name=$2 WHERE orders_name =$1`;
    const values = [ordersName, newOrders];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete by ID
app.delete("/delete_user/:id", (req, res) => {
  const id = req.params.id;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `DELETE FROM orders WHERE id=$1`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

// Recipe Routes
// GET orders
app.get("/get_recipes", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database", err);
      res.status(500).send("Internal service error");
    }
    client.query(`SELECT * FROM recipes;`, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Post Recipes
app.post("/create_recipes", (req, res) => {
  const recipeName = req.body.recipe_name;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO recipes (recipe_name) VALUES ($1);`;
    const values = [recipeName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//GET recipes by ID
app.get("/get_recipes/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT * FROM recipes WHERE id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Update Recipe by ID (update)
app.put("/update_recipes/:id", (req, res) => {
  const id = req.params.id;
  const recipeName = req.body.recipe_name;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update recipes SET recipe_name =$1 WHERE id =$2`;
    const values = [recipeName, id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete by ID
app.delete("/delete_recipe_by/:id", (req, res) => {
  const id = req.params.id;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `DELETE FROM recipes WHERE id=$1`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Customers Routes
app.get("/get_customers", (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database", err);
      res.status(500).send("Internal service error");
    }
    client.query(`SELECT * FROM customers;`, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Post Customers (create)
app.post("/create_customers", (req, res) => {
  const customersName = req.body.customersName;

  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }
    const sqlQuery = `INSERT INTO customers (customers_name) VALUES ($1);`;
    const values = [customersName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//GET customers by ID
app.get("/get_customers/:id", (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `SELECT * FROM customers WHERE id = $1;`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Update Customers by ID (update)
app.put("/update_customers/:id", (req, res) => {
  const id = req.params.id;
  const customersName = req.body.customersName;
  const customerName = req.body.customerName;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `Update customers SET customers_name =$1 WHERE customers_name =$2`;
    const values = [customersName, customerName];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Delete by ID
app.delete("/delete_customers_by/:id", (req, res) => {
  const id = req.params.id;
  pool.connect((err, client, release) => {
    if (err) {
      release();
      console.log("Error connecting to the database:", err);
      res.status(500).send("Internal service error");
    }

    const sqlQuery = `DELETE FROM customers WHERE id=$1`;
    const values = [id];

    client.query(sqlQuery, values, (err, result) => {
      release();
      if (err) {
        console.log("Error in executing the query: ", err);
        res.status(500).send("Internal server error");
        return;
      }
      res.send(result);
    });
  });
});

//Start server
const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
