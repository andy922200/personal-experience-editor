<p align="center">
  <a href="https://personal-experience-editor.herokuapp.com/">
    <img src="./iconForReadme.svg" alt="logo" width="48" height="48">
  </a>
</p>

<h3 align="center"> Years of Experience? </h3>
<a href="https://personal-experience-editor.herokuapp.com/">
  <p align="center">Click here to the demo site</p>
</a>

## Table of Contents
- [About this project](#about-this-project)
- [How to use](#how-to-use)
- [Run the local server](#run-the-local-server)
- [Run the frontend server](#run-the-frontend-server)

## About this project 
<p> Users can do the following actions.</p>

1. Basic Functions
  - [x] View all public users' work experiences
  - [x] Create, Edit, Delete their own work experiences and profile if they logged in
  - [x] Offline Mode
2. Advanced Functions
  - [x] Register
  - [x] Log-in
  
## How to use
**Website**
<p> Users can browse public personal work experience by default.</p> 
<p> If they logged in, they could create, edit and delete their own personal profile and work experiences.</p>

## Source Kits used in this project
**Front End**
- [vue](https://vuejs.org/) - The Progressive JavaScript Framework.
- [Bootstrap Vue]() - With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [sweetalert2](https://sweetalert2.github.io/) - A beautiful, responsive, customizable popup boxes

**Back End**
- [cors](https://www.npmjs.com/package/cors) - To activate Cross-Origin Resource Sharing
- [faker](https://www.npmjs.com/package/faker) - To generate the seed data for testing
- [imgur-node-api](https://www.npmjs.com/package/imgur-node-api) - Imgur anonymous upload in nodejs using the imgur api.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
- [sequelize](https://www.npmjs.com/package/sequelize) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

## Run the local server
### Prerequisites
- [npm](https://www.npmjs.com/get-npm)
- [Node.js](https://nodejs.org/en/download/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/andy922200/personal-experience-editor.git
```
### Setup Database
**Create database via MySQL Workbench Panel**

```
> Run the following code
drop database if personal_experience_editor;
create database personal_experience_editor;
```

### Setup the Project on your device
**1. Enter the project folder**
```
$ cd PersonalExperienceEditor
```
**2. Install packages via npm**

```
$ npm install
```
**3. Edit password in config.json file**
```
> /server/config/config.json
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "personal_experience_editor",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": "Sequelize.Op"
}
```
**4. Run migration**
```
> run the following code in the console  @ "/server"
$ cd /server
$ npx sequelize db:migrate
```
**5. Add Seeder**
```
> run the following code in the console  @ "/server"
$ npx sequelize db:seed:all
```
**6. Activate the server**
```
$ npm run dev
```
**7. Find the message on your console**
```
If you see the following message, the backend server is running.
> App is listening on port 3000!
``` 

## Run the frontend server
**1. Enter the project folder**
```
> Open a new terminal window and enter the client folder
$ cd PersonalExperienceEditor/client
```
**2. Install packages via npm**
```
$ npm install
```
**3. Compiles the webpack for development**
```
$ npm run serve
```
**4. Format the coding style( If necessary )**
```
$ npm run lint
```

## Author
- [Andy Lien](https://github.com/andy922200)
- [The site icon is made by Freepik published on www.flaticon.com](https://www.flaticon.com/)