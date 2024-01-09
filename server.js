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
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        message: "What would you like to do?",
        name: "action",
    },
    ])
    .then((responses) => {
      const systemAction = responses.action;
      // let splitResponse = (JSON.stringify(systemAction)).split(",");
      // console.log(splitResponse)

      // If user selects "Quit" it will end inquirer
      if (systemAction[0] === "Quit") {
        process.exit();
      
      // If user selects "View All Employees" it view the employee table

      } else if (systemAction[0] === "View All Employees") {
        console.log(systemAction.action);
        const sql = `SELECT * FROM employee`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      
      // If user selects "View All Departments" it view the department table
  
      } else if (systemAction[0] === "View All Departments") {
        const sql = `SELECT * FROM department`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });

      // If user selects "View All Roles" it view the role table

      } else if (systemAction[0] === "View All Roles") {
        const sql = `SELECT * FROM role`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });

      // If user selects "Add Department" they can add a new department

      } else if (systemAction[0] === "Add Department") {

        inquirer
          .prompt ([
            {
              type: "input",
              message: "What is the name of the department?",
              name: "department",
          },
          ])
          .then((responses) => {
            const dep = JSON.stringify(responses.department)
            const sql = `INSERT INTO department (id, name)
            VALUES (${dep})`

            db.query(sql, function (err, result) {
              if (err) throw err;
              });
            })
      }
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
  