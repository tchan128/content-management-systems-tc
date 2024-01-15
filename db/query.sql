-- Viewing all roles -- 

SELECT role.id, role.title, role.department_id, department.name, role.salary
FROM role
INNER JOIN department
ON role.department_id = department.id;

--  Viewing all employees; currently missing manager_id -- 

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id
FROM ((employee
INNER JOIN role ON role.id = employee.role_id)
INNER JOIN department ON role.department_id = department.id)