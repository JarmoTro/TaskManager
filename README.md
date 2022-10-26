# Task Manager

## By Jarmo Troska

[What is a Task Manager?](#what-is-a-task-manager)

[Project structure](#project-structure)

[Technologies used](#technologies-used)

[Configuring the application to run in your environment](#configuring-the-application-to-run-in-your-environment)

[Gallery](#gallery)

## What is a task manager?

Ever find yourself struggling to remember mundane tasks?

Do you want a simple way to keep track of your tasks from anywhere?

Task Manager is here to help!

Task Manager uses a simplistic, modern UI to help you keep track of your tasks.

Simply create an account and get started!

## Project structure

The application consists of two parts.

The back-end, a REST API made using Node.js that communicates with a MongoDB database.

The front-end, made using Vue that communicates with the back-end API using Axios for HTTP requests.

## Technologies used

### Front-end

Vue 3 https://vuejs.org/

Bootstrap 5 https://getbootstrap.com/docs/5.1/getting-started/introduction/

Font Awesome https://fontawesome.com/

Axios https://axios-http.com/docs/intro

### Back-end

Node.js https://nodejs.org/en/

Express https://www.npmjs.com/package/express

MongoDB (as the database) https://www.mongodb.com/

Mongoose https://mongoosejs.com/

dotenv https://www.npmjs.com/package/dotenv

bcrypt https://www.npmjs.com/package/bcrypt

## Configuring the application to run in your environment

### Prerequisites

The versions are soft requirements, the application might run with different versions, however it is recommended to use the specfic versions for highest stability

- Node.js 16.x
- NPM 8.x
- MongoDB 5.x
- Vue 3.x

### Getting started

#### Configuring the back-end

1. Open your CLI and change the directory to the back-end project folder.

```powershell
cd .../TaskManager/Back-end
```

2. Run "npm i" in your CLI (node_modules have been added to .gitignore).

```powershell
npm i
```

3. Create a new .env file and add the PORT, SECRET and DB_CONNECTION variables. Example .env.example has been provided.

PORT: The port on which the back-end will run (E.g. 3000).

DB_CONNECTION: The Mongoose connection string used for connecting to a MongoDB database (E.g. 'mongodb://localhost:27017/TaskManager').

SECRET: The secret key used to sign JWTs (E.g. '74a1ca44ee4e4e548a7e29f8539cd3d9').

<strong style="color: red;"> Don't forget to exclude the .env from version control!</strong>

```
PORT=your_port
DB_CONNECTION='your_db_connection_string'
SECRET='your_secret'
```

4. Run "npm start" in your CLI to launch the application.

```powershell
npm start
```

5. If everything went well, you should now be greeted by a "The API is now running" message in your CLI.

#### Configuring the front-end

1. Make sure that the back-end is running. Find out how to do that [here](#getting-started).

2. Open your CLI and change the directory to the front-end project folder.

```powershell
cd .../TaskManager/Front-end
```

3. Run "npm i" in your CLI (node_modules have been added to .gitignore).

```powershell
npm i
```

4. Run "npm run dev" in your CLI to launch the application in the developmental environment.

```powershell
npm run dev
```

## Gallery

