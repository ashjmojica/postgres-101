In this exercise, you will be creating a database schema to manage orders, recipes, and customers for a food-related application. The schema will consist of three tables: Orders, Recipes, and Customers. The Orders table will act as a join table between Recipes and Customers, allowing customers to associate specific recipes with their orders.
Table Descriptions:
Recipes Table:
The Recipes table will store information about different recipes available.
It will have the following columns:id: An auto-incrementing unique identifier for each recipe.
recipe_name: A string column representing the name or description of the recipe.
created_at: A timestamp column indicating the creation time of the recipe.
Customers Table:
The Customers table will store information about each customer.
It will have the following columns:id: An auto-incrementing unique identifier for each customer.
customer_name: A string column representing the name of the customer.
created_at: A timestamp column indicating the creation time of the customer.
Orders Table:
The Orders table will serve as a join table between the Recipes and Orders tables.
It will have the following columns:recipe_id: A foreign key reference to the Recipes table, indicating the recipe associated with an order.
order_id: A foreign key reference to the Orders table, indicating the order associated with a recipe.
The combination of recipe_id and order_id will form the primary key of this table.
Instructions:
Use the provided Express framework and PostgreSQL library to build the backend for this application.
Implement the table creation functions for Orders, Recipes, Customers, and Recipes_Orders tables.
Update the PostgreSQL connection details in the pool configuration to match your specific database setup.
Create the necessary routes to handle CRUD operations for managing orders, recipes, and customers, based on your application’s requirements.
Remember to test your routes and database operations to ensure the proper functioning of the application.