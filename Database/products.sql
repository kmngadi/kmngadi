-- Insert sample products
INSERT INTO Products (ProductName, ProductDescription, Price) VALUES
('Product A', 'Description for Product A', 10.00),
('Product B', 'Description for Product B', 20.00);

-- Insert inventory data
INSERT INTO Inventory (ProductID, Quantity) VALUES
(1, 100),
(2, 200);

--add product--
INSERT INTO Products (ProductName, ProductDescription, Price) VALUES
('Product C', 'Description for Product C', 15.00);
