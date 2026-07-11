import type { Course } from '../../types/curriculum';

export const sqlCourse: Course = {
  id: 'py4',
  title: 'SQL',
  tagline: 'Query and manage relational databases',
  philosophy: 'SQL is taught through real data scenarios — SELECT, JOIN, and GROUP BY on tables you can visualize.',
  icon: '🗄️',
  color: 'from-blue-600 to-blue-800',
  level: 'BEGINNER',
  pillar: 'Data Science',
  xp: 250,
  sections: [
    {
      sectionId: 'sql-section-1',
      title: 'Section 1: SQL Fundamentals',
      learningObjective: 'Master the core SQL concepts including SELECT, WHERE, ORDER BY, and basic data manipulation.',
      order: 1,
      isLocked: false,
      xpReward: 100,
      keyConcepts: ['SELECT', 'WHERE', 'ORDER BY', 'INSERT', 'UPDATE', 'DELETE'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'sql-01', title: 'SELECT & Basic Queries', type: 'learn', difficulty: 'beginner', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 1 of 5',
            conceptText: 'SELECT retrieves data from tables. Basic syntax: SELECT column1, column2 FROM table;. Use * to select all columns: SELECT * FROM table;. SQL is case-insensitive for keywords but uppercase is convention. Semicolons terminate statements. The FROM clause specifies the table. Results are returned as a result set (rows and columns). Always specify columns explicitly in production for performance and clarity.',
            instructions: 'Write a query to select name and email from a users table.',
          },
          utilities: {
            hint: 'SELECT name, email FROM users;',
            flashcard: { front: 'What does SELECT * do and why avoid it in production?', back: 'SELECT * retrieves all columns. Avoid in production because: it returns unnecessary data (slow), breaks if schema changes, and prevents index optimization. Always specify needed columns explicitly.' },
            solution: 'SELECT name, email FROM users;',
          },
          rightPanel: { startingCode: '-- Select name and email from users\n', expectedOutput: 'name, email columns' },
        },
        {
          lessonId: 'sql-02', title: 'WHERE Clause & Filtering', type: 'learn', difficulty: 'beginner', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 2 of 5',
            conceptText: 'WHERE filters rows based on conditions. Operators: =, !=, <>, <, >, <=, >=. Logical operators: AND, OR, NOT. Pattern matching: LIKE with % (wildcard) and _ (single character). NULL checks: IS NULL, IS NOT NULL (not = NULL). WHERE is applied before GROUP BY and HAVING. Always use parameterized queries to prevent SQL injection in applications.',
            instructions: 'Select users where age is greater than 18 and status is "active".',
          },
          utilities: {
            hint: 'SELECT * FROM users WHERE age > 18 AND status = "active";',
            flashcard: { front: 'Why use IS NULL instead of = NULL?', back: 'NULL represents unknown, not a value. Comparisons with NULL always return NULL (neither true nor false). IS NULL checks for NULL values. Use IS NOT NULL to exclude NULLs.' },
            solution: 'SELECT * FROM users WHERE age > 18 AND status = "active";',
          },
          rightPanel: { startingCode: '-- Filter users by age and status\n', expectedOutput: 'Filtered user results' },
        },
        {
          lessonId: 'sql-03', title: 'ORDER BY & LIMIT', type: 'learn', difficulty: 'beginner', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 3 of 5',
            conceptText: 'ORDER BY sorts results: ORDER BY column ASC (default) or DESC. Sort by multiple columns: ORDER BY column1 ASC, column2 DESC. LIMIT restricts the number of rows returned: LIMIT 10. OFFSET skips rows: LIMIT 10 OFFSET 20 (pagination). ORDER BY is applied after WHERE and before LIMIT. Use LIMIT for pagination and top-N queries.',
            instructions: 'Select the top 5 users by score in descending order.',
          },
          utilities: {
            hint: 'SELECT * FROM users ORDER BY score DESC LIMIT 5;',
            flashcard: { front: 'What is the difference between ORDER BY and DISTINCT?', back: 'ORDER BY sorts results by specified columns. DISTINCT removes duplicate rows from the result set. They can be combined: SELECT DISTINCT column FROM table ORDER BY column.' },
            solution: 'SELECT name, score FROM users ORDER BY score DESC LIMIT 5;',
          },
          rightPanel: { startingCode: '-- Get top 5 users by score\n', expectedOutput: 'Top 5 users' },
        },
        {
          lessonId: 'sql-04', title: 'INSERT, UPDATE, DELETE', type: 'practice', difficulty: 'beginner', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 4 of 5',
            conceptText: 'INSERT adds new rows: INSERT INTO table (col1, col2) VALUES (val1, val2);. UPDATE modifies existing rows: UPDATE table SET col = val WHERE condition;. Always include WHERE or all rows update. DELETE removes rows: DELETE FROM table WHERE condition;. Always include WHERE or all rows delete. These operations modify data — use transactions for safety. Always backup before bulk operations.',
            instructions: 'Insert a new user with name "Munira" and email "munira@example.com". Then update their status to "active".',
          },
          utilities: {
            hint: 'INSERT INTO users (name, email) VALUES ("Munira", "munira@example.com");\nUPDATE users SET status = "active" WHERE name = "Munira";',
            flashcard: { front: 'Why is it dangerous to use UPDATE or DELETE without WHERE?', back: 'Without WHERE, UPDATE modifies EVERY row in the table and DELETE removes EVERY row. Always include WHERE clause. Use transactions: BEGIN; UPDATE ... WHERE ...; COMMIT; or ROLLBACK; if something goes wrong.' },
            solution: 'INSERT INTO users ((name, email, status) VALUES ("Munira", "munira@example.com", "pending");\nUPDATE users SET status = "active" WHERE name = "Munira";',
          },
          rightPanel: { startingCode: '-- Insert and update user\n', expectedOutput: 'User inserted and updated' },
        },
        {
          lessonId: 'sql-05', title: 'Aggregate Functions', type: 'practice', difficulty: 'beginner', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 1 — Lesson 5 of 5',
            conceptText: 'Aggregate functions calculate values across rows: COUNT() counts rows, SUM() adds values, AVG() calculates average, MIN() and MAX() find extremes. Use with GROUP BY to aggregate by categories: SELECT category, COUNT(*) FROM products GROUP BY category;. HAVING filters aggregated results (WHERE filters before aggregation). Aggregate functions ignore NULL values except COUNT(*).',
            instructions: 'Count the total number of users and calculate the average score.',
          },
          utilities: {
            hint: 'SELECT COUNT(*) as total_users, AVG(score) as avg_score FROM users;',
            flashcard: { front: 'What is the difference between WHERE and HAVING?', back: 'WHERE filters rows before aggregation (cannot use aggregate functions). HAVING filters groups after aggregation (can use aggregate functions). Use WHERE for row-level filtering, HAVING for group-level filtering.' },
            solution: 'SELECT COUNT(*) as total_users, AVG(score) as avg_score, MAX(score) as highest_score, MIN(score) as lowest_score FROM users;',
          },
          rightPanel: { startingCode: '-- Calculate user statistics\n', expectedOutput: 'User count and average score' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'sql-super-01', title: 'NULL Handling & Coalesce', type: 'supercharge', difficulty: 'intermediate', track: 'sql', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 1 — Supercharge Challenge',
            conceptText: 'NULL represents missing or unknown data. COALESCE(value1, value2, ...) returns the first non-NULL value. Use it for default values: COALESCE(email, "no-email@example.com"). NULLIF(value1, value2) returns NULL if values are equal. ISNULL() (SQL Server) or IFNULL() (MySQL) are database-specific alternatives. Always handle NULLs in calculations and comparisons to avoid unexpected results.',
            instructions: 'Select user names with a default email of "unknown@example.com" if email is NULL.',
          },
          utilities: {
            hint: 'SELECT name, COALESCE(email, "unknown@example.com") as email FROM users;',
            flashcard: { front: 'What happens when you perform arithmetic with NULL?', back: 'Any arithmetic operation with NULL returns NULL. 5 + NULL = NULL. This can cause unexpected results. Use COALESCE to provide defaults: COALESCE(column, 0) + 5.' },
            solution: 'SELECT name, COALESCE(email, "unknown@example.com") as email, COALESCE(score, 0) as score FROM users;',
          },
          rightPanel: { startingCode: '-- Handle NULL values with COALESCE\n', expectedOutput: 'Users with default values for NULLs' },
        },
      ],
      sectionProject: {
        lessonId: 'sql-project-1', title: 'Section Project: Student Database Queries', type: 'project', difficulty: 'beginner', track: 'sql', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 1 — Section Project',
          conceptText: 'Build a set of queries for a student database using all SQL fundamentals learned. This project will demonstrate SELECT, WHERE, ORDER BY, aggregates, and data modification.',
          instructions: 'Create queries for:\n  • List all students with their grades\n  • Find students with grade A (90+)\n  • Calculate average grade per subject\n  • Count students by grade level\n  • Add a new student\n  • Update a student\'s grade',
        },
        utilities: {
          hint: 'Use SELECT with WHERE for filtering. Use GROUP BY with aggregate functions for statistics. Use INSERT and UPDATE for data modification. Use ORDER BY for sorting. Combine multiple queries for comprehensive analysis.',
          flashcard: { front: 'What makes a well-structured SQL query?', back: 'Clear column selection (not *), proper WHERE filtering, appropriate use of aggregates with GROUP BY, readable formatting, meaningful aliases, and comments explaining complex logic.' },
          solution: '-- 1. List all students with grades\nSELECT name, subject, grade FROM students ORDER BY name, subject;\n\n-- 2. Find students with grade A (90+)\nSELECT name, subject, grade FROM students WHERE grade >= 90 ORDER BY grade DESC;\n\n-- 3. Calculate average grade per subject\nSELECT subject, AVG(grade) as avg_grade, COUNT(*) as student_count FROM students GROUP BY subject ORDER BY avg_grade DESC;\n\n-- 4. Count students by grade level\nSELECT \n  CASE \n    WHEN grade >= 90 THEN "A"\n    WHEN grade >= 80 THEN "B"\n    WHEN grade >= 70 THEN "C"\n    WHEN grade >= 60 THEN "D"\n    ELSE "F"\n  END as grade_level,\n  COUNT(*) as count\nFROM students\nGROUP BY grade_level\nORDER BY grade_level;\n\n-- 5. Add a new student\nINSERT INTO students (name, subject, grade) VALUES ("Jordan", "Math", 85);\n\n-- 6. Update a student\'s grade\nUPDATE students SET grade = 92 WHERE name = "Jordan" AND subject = "Math";',
        },
        rightPanel: { startingCode: '-- Create student database queries\n', expectedOutput: 'Complete set of student queries' },
      },
    },
    {
      sectionId: 'sql-section-2',
      title: 'Section 2: Advanced SQL & Joins',
      learningObjective: 'Learn to work with multiple tables using JOINs, subqueries, and advanced SQL features.',
      order: 2,
      isLocked: true,
      xpReward: 100,
      keyConcepts: ['JOINs', 'Subqueries', 'UNION', 'Window Functions', 'Indexes', 'Transactions'],
      estimatedMinutes: 75,
      lessons: [
        {
          lessonId: 'sql-06', title: 'INNER JOIN & LEFT JOIN', type: 'learn', difficulty: 'intermediate', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 1 of 5',
            conceptText: 'JOINs combine data from multiple tables. INNER JOIN returns rows with matches in both tables. LEFT JOIN returns all rows from left table, matching rows from right (NULL if no match). Syntax: SELECT * FROM table1 JOIN table2 ON table1.id = table2.id;. Use aliases for readability: t1 JOIN t2 ON t1.id = t2.id. JOINs are fundamental for relational databases where data is normalized across tables.',
            instructions: 'Join users and orders tables to show user names with their order totals.',
          },
          utilities: {
            hint: 'SELECT u.name, SUM(o.total) as order_total FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name;',
            flashcard: { front: 'What is the difference between INNER JOIN and LEFT JOIN?', back: 'INNER JOIN: only rows with matches in both tables. LEFT JOIN: all rows from left table, NULLs for non-matches in right. Use INNER for strict relationships, LEFT for optional relationships (like users with no orders).' },
            solution: 'SELECT u.name, COUNT(o.id) as order_count, COALESCE(SUM(o.total), 0) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name ORDER BY total_spent DESC;',
          },
          rightPanel: { startingCode: '-- Join users and orders\n', expectedOutput: 'Users with order statistics' },
        },
        {
          lessonId: 'sql-07', title: 'Subqueries & EXISTS', type: 'learn', difficulty: 'intermediate', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 2 of 5',
            conceptText: 'Subqueries are queries nested within other queries. Can be in SELECT, WHERE, or FROM clauses. EXISTS checks if subquery returns any rows: WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = users.id). IN checks if value matches any in subquery result. Correlated subqueries reference outer query columns. Subqueries can be slower than JOINs — prefer JOINs when possible.',
            instructions: 'Find users who have placed orders (using EXISTS).',
          },
          utilities: {
            hint: 'SELECT name FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id);',
            flashcard: { front: 'When to use EXISTS vs IN?', back: 'EXISTS is faster for large datasets because it stops at first match. IN evaluates the entire subquery. Use EXISTS for existence checks, IN for matching against a list of values. Both can often be rewritten as JOINs for better performance.' },
            solution: 'SELECT name, email FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE orders.user_id = users.id AND orders.total > 100);',
          },
          rightPanel: { startingCode: '-- Find users with orders using EXISTS\n', expectedOutput: 'Users who have placed orders' },
        },
        {
          lessonId: 'sql-08', title: 'UNION & Set Operations', type: 'learn', difficulty: 'intermediate', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 3 of 5',
            conceptText: 'UNION combines result sets from multiple queries (removes duplicates). UNION ALL includes duplicates. INTERSECT returns rows in both result sets. EXCEPT (or MINUS) returns rows in first but not second. All queries must have same number of columns with compatible data types. Column names from first query. Useful for combining data from similar tables or conditions.',
            instructions: 'Combine names from students and teachers into a single list.',
          },
          utilities: {
            hint: 'SELECT name FROM students UNION SELECT name FROM teachers;',
            flashcard: { front: 'What is the difference between UNION and UNION ALL?', back: 'UNION removes duplicate rows (slower due to deduplication). UNION ALL includes all rows including duplicates (faster). Use UNION for distinct results, UNION ALL when you know there are no duplicates or want all rows.' },
            solution: 'SELECT name, "student" as role FROM students UNION ALL SELECT name, "teacher" as role FROM teachers ORDER BY name;',
          },
          rightPanel: { startingCode: '-- Combine students and teachers\n', expectedOutput: 'Combined list of all people' },
        },
        {
          lessonId: 'sql-09', title: 'Window Functions', type: 'practice', difficulty: 'intermediate', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 4 of 5',
            conceptText: 'Window functions perform calculations across rows related to current row. Syntax: function() OVER (PARTITION BY ... ORDER BY ...). ROW_NUMBER() assigns unique numbers. RANK() assigns ranks with ties. DENSE_RANK() assigns ranks without gaps. LAG() and LEAD() access previous/next rows. SUM() OVER() calculates running totals. Window functions don\'t collapse rows like aggregates.',
            instructions: 'Calculate running total of sales per customer using window functions.',
          },
          utilities: {
            hint: 'SELECT customer_id, sale_date, amount, SUM(amount) OVER (PARTITION BY customer_id ORDER BY sale_date) as running_total FROM sales;',
            flashcard: { front: 'What is the difference between RANK() and DENSE_RANK()?', back: 'RANK() leaves gaps for ties (1, 2, 2, 4). DENSE_RANK() doesn\'t leave gaps (1, 2, 2, 3). Use RANK() when gaps are acceptable, DENSE_RANK() when you want consecutive numbering.' },
            solution: 'SELECT customer_id, sale_date, amount, SUM(amount) OVER (PARTITION BY customer_id ORDER BY sale_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as running_total, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY sale_date) as sale_number FROM sales;',
          },
          rightPanel: { startingCode: '-- Calculate running totals with window functions\n', expectedOutput: 'Sales with running totals' },
        },
        {
          lessonId: 'sql-10', title: 'Indexes & Performance', type: 'practice', difficulty: 'intermediate', track: 'sql', xpReward: 20,
          leftPanel: {
            chapterProgress: 'Section 2 — Lesson 5 of 5',
            conceptText: 'Indexes speed up data retrieval. CREATE INDEX idx_name ON table(column);. Indexes on columns used in WHERE, JOIN, ORDER BY. Trade-off: faster reads, slower writes (index must be updated). Composite indexes on multiple columns: (col1, col2). Use EXPLAIN to analyze query plans. Don\'t over-index — each index costs write performance and storage. Primary keys are automatically indexed.',
            instructions: 'Create an index on the email column of users table and explain why.',
          },
          utilities: {
            hint: 'CREATE INDEX idx_users_email ON users(email);\n-- Indexes speed up WHERE email = ? and JOINs on email',
            flashcard: { front: 'When should you create an index?', back: 'On columns frequently used in WHERE clauses, JOIN conditions, ORDER BY, and GROUP BY. Not on columns with low cardinality (few unique values) or tables that are mostly written/read rarely. Analyze query performance first.' },
            solution: '-- Create index on email for fast lookups\nCREATE INDEX idx_users_email ON users(email);\n\n-- Composite index for common query patterns\nCREATE INDEX idx_users_status_score ON users(status, score DESC);\n\n-- Analyze query performance\nEXPLAIN SELECT * FROM users WHERE email = "munira@example.com";',
          },
          rightPanel: { startingCode: '-- Create and explain indexes\n', expectedOutput: 'Index created and explained' },
        },
      ],
      superchargeLessons: [
        {
          lessonId: 'sql-super-02', title: 'Transactions & ACID', type: 'supercharge', difficulty: 'advanced', track: 'sql', xpReward: 25,
          leftPanel: {
            chapterProgress: 'Section 2 — Supercharge Challenge',
            conceptText: 'Transactions group operations into atomic units. BEGIN starts, COMMIT saves, ROLLBACK undoes. ACID properties: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don\'t interfere), Durability (committed changes persist). Use transactions for multi-step operations like bank transfers. Isolation levels control visibility: READ COMMITTED, REPEATABLE READ, SERIALIZABLE.',
            instructions: 'Create a transaction that transfers money between accounts with rollback on error.',
          },
          utilities: {
            hint: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;',
            flashcard: { front: 'What are the ACID properties in database transactions?', back: 'Atomicity: all operations succeed or none do. Consistency: database remains in valid state. Isolation: transactions don\'t interfere. Durability: committed changes survive system failures. These guarantee data integrity.' },
            solution: 'BEGIN TRANSACTION;\n\n-- Check sufficient balance\nDECLARE @balance INT;\nSELECT @balance = balance FROM accounts WHERE id = 1;\n\nIF @balance >= 100\nBEGIN\n  -- Deduct from sender\n  UPDATE accounts SET balance = balance - 100 WHERE id = 1;\n  \n  -- Add to receiver\n  UPDATE accounts SET balance = balance + 100 WHERE id = 2;\n  \n  -- Record transaction\n  INSERT INTO transactions (from_id, to_id, amount) VALUES (1, 2, 100);\n  \n  COMMIT TRANSACTION;\n  PRINT "Transfer successful";\nEND\nELSE\nBEGIN\n  ROLLBACK TRANSACTION;\n  PRINT "Insufficient funds";\nEND',
          },
          rightPanel: { startingCode: '-- Create transaction with error handling\n', expectedOutput: 'Transaction with rollback on error' },
        },
      ],
      sectionProject: {
        lessonId: 'sql-project-2', title: 'Section Project: E-commerce Database Schema', type: 'project', difficulty: 'intermediate', track: 'sql', xpReward: 30,
        leftPanel: {
          chapterProgress: 'Section 2 — Section Project',
          conceptText: 'Design and query an e-commerce database schema using advanced SQL features. This project will demonstrate JOINs, subqueries, window functions, and performance optimization.',
          instructions: 'Create queries for:\n  • Products with categories using JOIN\n  • Customer order history with running totals\n  • Top-selling products per category\n  • Customers who haven\'t ordered recently\n  • Monthly sales trends\n  • Add appropriate indexes',
        },
        utilities: {
          hint: 'Use JOINs for related data. Use window functions for running totals and rankings. Use subqueries for complex filtering. Use GROUP BY for aggregations. Add indexes on frequently queried columns. Use EXPLAIN to analyze performance.',
          flashcard: { front: 'What makes a well-designed database schema?', back: 'Proper normalization (3NF), appropriate foreign keys, indexes on query columns, clear naming conventions, data types that match the data, and constraints for data integrity.' },
          solution: '-- 1. Products with categories\nSELECT p.name, p.price, c.name as category FROM products p JOIN categories c ON p.category_id = c.id;\n\n-- 2. Customer order history with running totals\nSELECT c.name, o.order_date, o.total, SUM(o.total) OVER (PARTITION BY c.id ORDER BY o.order_date) as running_total FROM customers c JOIN orders o ON c.id = o.customer_id ORDER BY c.name, o.order_date;\n\n-- 3. Top-selling products per category\nSELECT c.name as category, p.name as product, SUM(oi.quantity) as total_sold FROM products p JOIN categories c ON p.category_id = c.id JOIN order_items oi ON p.id = oi.product_id GROUP BY c.id, c.name, p.id, p.name ORDER BY c.name, total_sold DESC;\n\n-- 4. Customers who haven\'t ordered in 30 days\nSELECT c.name, MAX(o.order_date) as last_order FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name HAVING MAX(o.order_date) < DATE("now", "-30 days") OR MAX(o.order_date) IS NULL;\n\n-- 5. Monthly sales trends\nSELECT strftime("%Y-%m", o.order_date) as month, SUM(o.total) as total_sales, COUNT(*) as order_count FROM orders o GROUP BY month ORDER BY month DESC;\n\n-- 6. Create indexes\nCREATE INDEX idx_products_category ON products(category_id);\nCREATE INDEX idx_orders_customer ON orders(customer_id);\nCREATE INDEX idx_orders_date ON orders(order_date);\nCREATE INDEX idx_order_items_product ON order_items(product_id);',
        },
        rightPanel: { startingCode: '-- Create e-commerce database queries\n', expectedOutput: 'Complete e-commerce query set' },
      },
    },
  ],
  capstoneProject: {
    lessonId: 'sql-capstone', title: 'Course Capstone: AcademicQuest Database Design', type: 'project', difficulty: 'advanced', track: 'sql', xpReward: 50,
    leftPanel: {
      chapterProgress: 'Course Capstone — Final Project',
      conceptText: 'Design a complete database schema for AcademicQuest using all SQL concepts learned. This capstone will demonstrate schema design, complex queries, performance optimization, and transaction handling.',
      instructions: 'Design and implement:\n  • Complete schema with tables for users, courses, enrollments, progress\n  • Foreign key relationships\n  • Complex queries for analytics\n  • Performance indexes\n  • Transaction examples\n  • Data integrity constraints',
    },
    utilities: {
      hint: 'Design normalized schema with proper relationships. Use foreign keys for referential integrity. Create indexes on query columns. Write complex queries using JOINs, subqueries, and window functions. Use transactions for multi-step operations. Add constraints for data validation.',
      flashcard: { front: 'What makes a production-ready database design?', back: 'Normalized schema (3NF), proper indexes, foreign key constraints, data validation, appropriate data types, clear naming conventions, backup strategy, security (least privilege), and monitoring.' },
      solution: '-- Schema Design\nCREATE TABLE users (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  xp INTEGER DEFAULT 0,\n  level INTEGER DEFAULT 1,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE courses (\n  id TEXT PRIMARY KEY,\n  title TEXT NOT NULL,\n  description TEXT,\n  xp_reward INTEGER NOT NULL,\n  level TEXT NOT NULL,\n  category TEXT NOT NULL\n);\n\nCREATE TABLE enrollments (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  user_id INTEGER NOT NULL,\n  course_id TEXT NOT NULL,\n  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  progress INTEGER DEFAULT 0,\n  completed_at TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id),\n  FOREIGN KEY (course_id) REFERENCES courses(id),\n  UNIQUE(user_id, course_id)\n);\n\nCREATE TABLE lessons (\n  id TEXT PRIMARY KEY,\n  course_id TEXT NOT NULL,\n  title TEXT NOT NULL,\n  xp_reward INTEGER NOT NULL,\n  order_index INTEGER NOT NULL,\n  FOREIGN KEY (course_id) REFERENCES courses(id)\n);\n\nCREATE TABLE lesson_progress (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  user_id INTEGER NOT NULL,\n  lesson_id TEXT NOT NULL,\n  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id),\n  FOREIGN KEY (lesson_id) REFERENCES lessons(id),\n  UNIQUE(user_id, lesson_id)\n);\n\n-- Indexes\nCREATE INDEX idx_enrollments_user ON enrollments(user_id);\nCREATE INDEX idx_enrollments_course ON enrollments(course_id);\nCREATE INDEX idx_lessons_course ON lessons(course_id);\nCREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);\n\n-- Complex Queries\n-- User progress summary\nSELECT u.name, u.xp, u.level, COUNT(e.id) as courses_enrolled, SUM(e.progress) as total_progress FROM users u LEFT JOIN enrollments e ON u.id = e.user_id GROUP BY u.id;\n\n-- Course completion leaderboard\nSELECT u.name, COUNT(e.id) as courses_completed, SUM(c.xp_reward) as total_xp FROM users u JOIN enrollments e ON u.id = e.user_id JOIN courses c ON e.course_id = c.id WHERE e.completed_at IS NOT NULL GROUP BY u.id ORDER BY courses_completed DESC, total_xp DESC LIMIT 10;\n\n-- Lesson completion rates per course\nSELECT c.title, COUNT(l.id) as total_lessons, COUNT(lp.id) as completed_lessons, ROUND(CAST(COUNT(lp.id) AS FLOAT) / COUNT(l.id) * 100, 2) as completion_rate FROM courses c LEFT JOIN lessons l ON c.id = l.course_id LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id GROUP BY c.id ORDER BY completion_rate DESC;',
    },
    rightPanel: { startingCode: '-- Design complete AcademicQuest database\n', expectedOutput: 'Production-ready database schema' },
  },
  totalLessons: 10,
  totalXP: 250,
};
