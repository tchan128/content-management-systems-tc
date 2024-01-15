// const express = require('express');
const inquirer = require(`inquirer`);
// Import and require mysql2
const mysql = require('mysql');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'TCsak128@!', // Change this?
    database: 'employee_db'
  },
  console.log(`Success! Connected to the employee_db database.`)
);

// Prompts used in inquirer in the management system

const dbActions = [
  {
    type: "list",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    message: "What would you like to do?",
    name: "action",
  }
]

const addDep = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  }
]

const addRole = [
  {
      type: "input",
      message: "What is the name of the role?",
      name: "title",
  },
  {
    type: "input",
    message: "What is the salary of the role?",
    name: "salary",
  },          
  {
    type: "list",
    choices: [], // DEPARTMENT 
    message: "What department does the role belong to?",
    name: "department",
  }
]

const addEmployee = [
  {
      type: "input",
      message: "What is the employee's first name?",
      name: "first_name",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last_name",
  },          
  {
    type: "list",
    choices: [], // DEPARTMENT 
    message: "What is the employee's role?",
    name: "role",
  }, 
  {
    type: "list",
    choices: [], // DEPARTMENT 
    message: "What is the employee's manager?",
    name: "manager",
  }, 
  ]


inquirer
    .prompt (dbActions)
    .then((responses) => {
      const systemAction = responses.action;

      // If user selects "Quit" it will end inquirer

      if (systemAction[0] === "Quit") {
        process.exit();
      
      // If user selects "View All Employees" it view the employee table

      } else if (systemAction === "View All Employees") {
        console.log(systemAction.action);
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
        FROM ((employee INNER JOIN role ON role.id = employee.role_id) INNER JOIN department ON role.department_id = department.id)`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        })
        
        ;
      
      // If user selects "View All Departments" it view the department table
  
      } else if (systemAction === "View All Departments") {
        const sql = `SELECT * FROM department`

        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });

      // If user selects "View All Roles" it view the role table

      } else if (systemAction === "View All Roles") {
        const sql = `SELECT role.id, role.title, department.name, role.salary FROM role
        INNER JOIN department ON role.department_id = department.id;`
        db.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });

      // If user selects "Add Department" they can add a new department

      } else if (systemAction === "Add Department") {

        inquirer
          .prompt (addDep)
          .then((responses) => {
            const dep = JSON.stringify(responses.department)
            const sql = `INSERT INTO department (name)
            VALUES (${dep})`

            db.query(sql, function (err, result) {
              if (err) throw err;
              });
              console.log(`Success! Added ${dep} to the database`)
            })

      // If user selects "Add Role" they can add a new role      

      } else if (systemAction === "Add Role") {

        inquirer
          .prompt (addRole)
          .then((responses) => {
            const title = JSON.stringify(responses.title);
            const salary = JSON.stringify(responses.salary);
            const dep = JSON.stringify(responses.department);
            const sql = `INSERT INTO role (title, department_id, salary)
            VALUES (${title}, ${dep}, ${salary})`

            db.query(sql, function (err, result) {
              if (err) throw err;
              });
              console.log(`Success! Added ${title} to the database`)
            })

      // If user choses "Add Employee" they can add a new employee 
            
      } else if (systemAction === "Add Employee") {

        inquirer
          .prompt (addEmployee)
          .then((responses) => {
            const first_name = JSON.stringify(responses.first_name);
            const last_name = JSON.stringify(responses.last_name);
            const role = JSON.stringify(responses.role);
            const manager = JSON.stringify(responses.manager);
            const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id)
            VALUES (${title}, ${dep}, ${salary})`

            db.query(sql, function (err, result) {
              if (err) throw err;
              });
              console.log(`Success! Added ${first_name} ${last_name} to the database`)
            })
      }

    });




// // Add a new employee

// app.post('/api/employees', ({ body }, res) => {
//   const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
//     VALUES (?)`;
//   const params = [body.employee];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
  