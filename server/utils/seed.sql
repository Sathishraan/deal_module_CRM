-- schema.sql
CREATE TABLE IF NOT EXISTS deals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_name VARCHAR(100),
  company VARCHAR(100),
  stage ENUM('New','In Progress','Won','Lost') DEFAULT 'New',
  value DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  close_date DATETIME
);

-- seed.sql
INSERT INTO deals (name, contact_name, company, stage, value, close_date) VALUES
('Deal 1', 'John Doe', 'Company A', 'New', 5000, '2025-12-31'),
('Deal 2', 'Jane Smith', 'Company B', 'In Progress', 10000, '2025-11-15'),
('Deal 3', 'Alice Johnson', 'Company C', 'Won', 20000, '2025-09-10'),
('Deal 4', 'Bob Brown', 'Company D', 'Lost', 15000, '2025-10-05'),
('Deal 5', 'Charlie Davis', 'Company E', 'New', 8000, '2025-12-20'),
('Deal 6', 'Diana Evans', 'Company F', 'In Progress', 12000, '2025-11-25'),
('Deal 7', 'Ethan Foster', 'Company G', 'Won', 25000, '2025-09-30'),
('Deal 8', 'Fiona Green', 'Company H', 'New', 7000, '2025-12-10'),
('Deal 9', 'George Hill', 'Company I', 'Lost', 5000, '2025-10-15'),
('Deal 10', 'Hannah Irving', 'Company J', 'In Progress', 18000, '2025-11-05'),
('Deal 11', 'Ian Jackson', 'Company K', 'Won', 30000, '2025-09-20'),
('Deal 12', 'Julia King', 'Company L', 'New', 9000, '2025-12-05'),
('Deal 13', 'Kevin Lee', 'Company M', 'In Progress', 15000, '2025-11-12'),
('Deal 14', 'Laura Moore', 'Company N', 'Lost', 10000, '2025-10-25'),
('Deal 15', 'Michael Neal', 'Company O', 'Won', 22000, '2025-09-18'),
('Deal 16', 'Nina Owen', 'Company P', 'New', 6000, '2025-12-15'),
('Deal 17', 'Oscar Perry', 'Company Q', 'In Progress', 13000, '2025-11-22'),
('Deal 18', 'Paula Quinn', 'Company R', 'Lost', 8000, '2025-10-12'),
('Deal 19', 'Quentin Ross', 'Company S', 'Won', 27000, '2025-09-28'),
('Deal 20', 'Rachel Scott', 'Company T', 'New', 7500, '2025-12-28');
