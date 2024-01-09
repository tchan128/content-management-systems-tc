const express = require('express');
const inquirer = require(`inquirer`);
// Import and require mysql2
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TCsak128@!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

inquirer
    .prompt ([
      {
        type: "checkbox",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Department", "Add Department", "Quit"],
        message: "What would you like to do?",
        name: "action",
    },
    ])
    .then((responses) => {
      const systemAction = responses;

      if (systemAction.action[0] === "View All Employees") {
        const sql = `SELECT * FROM employee`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      } else if (systemAction.action[0] === "View All Departments") {
        const sql = `SELECT * FROM department`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      } else if (systemAction.action[0] === "View All Roles") {
        const sql = `SELECT * FROM role`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      }
    });

// View all departments
app.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// View all role
app.get('/roles', (req, res) => {
  const sql = `SELECT * FROM role`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// View all employees
app.get('/employees', (req, res) => {
  const sql = `SELECT * FROM employee`;
  
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Add a new department

app.post('/api/departments', ({ body }, res) => {
  const sql = `INSERT INTO department (id, name)
    VALUES (?)`;
  const params = [body.department];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Add a new role

app.post('/api/roles', ({ body }, res) => {
  const sql = `INSERT INTO role (id, title, department_id, salary)
    VALUES (?)`;
  const params = [body.role];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Add a new employee

app.post('/api/employees', ({ body }, res) => {
  const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES (?)`;
  const params = [body.employee];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  