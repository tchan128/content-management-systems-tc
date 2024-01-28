<div id="readme-top" align="center">
    <a href="https://github.com/tchan128/content-management-systems-tc"><img src="./assets/contentmanagement.png" alt="Logo" width="80" height="80"></a>
    <h3 align="center">Content Management System</h3>
    <p align="center">
        The motivation for this project is to create a content management system that can keep track of all roles, departments, and employees of a company. I built this project because as companies get bigger it is important to be organized and keep track of the structure of the company. This not only helps the human resources team but will be able to let employees know who to report to and who to go to for certain questions/tasks. This is a system that companies can use if they are looking to find a quick place to develop a company database of all employees, roles, and departments. This app is a solution for users who are looking to keep better track of the company structure in a quick and free way. Through this project, I learned how to build and seed  my own database and tables. Furthermore, I understood better how to extract exactly the data I need to use them to perform certain tasks. 
        <br/>
        <br/>
        <a href="https://github.com/tchan128/content-management-systems-tc"><strong>Explore the docs »</strong></a>
    </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#visuals">Visuals</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#credits">Credits</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About the Project

This project is a content management system. The system is build with Javascript, mySQL, and nodeJS. To build and visualize the database, mySQL Workbench was used. In this system, the main components is being able to: view all roles, view all department, view all employees, add employees, add roles, add departments, and update employee information. User will be have the ability to see these changes immediately in the system. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

To be able ot use this application, you need to git clone this repository into your local machine. 

Afterwards, you can use the `schema.sql` and `seeds.sql` to build your database and tables and also seed them with data. Once those are completed, you can install packages that are needed to work this program:

```
npm install -y
```

and 

```
npm install mysql
```

Once those are installed, you can go ahead and run this command to start the system

```
npm run start
```
 
<p align="right">(<a href="#readme-top">back to top</a>)</p>
 
## Usage

In this project, a content management system is built to help users browse through roles, department, and employees of a company. Users of this database can view all roles, view all department, view all employees, add employees, add roles, add departments, and update employee information. 

- When users `view all roles` they will be able to see all the roles that are in the company, including its salary and department
- When users `view all department ` they will be able to see all the departments in the company
- When users `view all employees` they will be able to see all the employees in the company including their first and last names, roles, and their manager
- When users `add employees` they will be able to add an employee to the database and choose which role they are in and who their manager is 
- When users `add roles` they will be able to add a role into the database and choose which department it falls under
- When users `add department` they will be able to add a department into the database
- When users `update employee information` they will be able to update an employee's role

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Visuals


## Roadmap

- [ ] Deleting employee, role, and department
- [ ] Updating employee manager

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Credits

This content management system was built from scratch the structure of the system is derived from a sample that UofT Bootcamp provided. 

In addition to that, some websites that helped with the build of this system include:

- Promise Chain documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- SQL query documentation: https://www.w3schools.com/sql/default.asp
- Array (map) documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

README icon is found here: https://www.flaticon.com/free-icon/content-management-system_2630878

The README template is found here: https://github.com/othneildrew/Best-README-Template

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Please refer to the LICENSE in the repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Tiffany Chan - tchan12899@gmail.com

Project Link: https://github.com/tchan128/content-management-systems-tc

<p align="right">(<a href="#readme-top">back to top</a>)</p>