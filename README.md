# IV1201-Group-9
Project for group in course IV1201 VT23 Arkitektur och design av globala applikationer. It is a web application made with Java and ReactJs.

## Project Description 

The aim of the project for this course is to learn how to make good choices about the architecture in order to create a web application that meets high standards and is easily built upon by other developers. This ensures that the code is flexible and clear, making it convenient for others to continue working on the project.

The web application serves as a tool for people to register and apply for a job at an amusement park. Individuals can log in using their credentials and submit their job application.

## Tools and Frameworks
- Node
- npm
- Spring Boot
- Spring Security
- Postgres
- JSON Web Token (JWT)
- React
- ChakraUI

## Architecture
The application is designed as a client-server architecture, consisting of a backend and a frontend. The backend, which is responsible for processing data and handling requests, is located in recApp/src/main/java/com/iv1201/recapp/. It is built using the Java programming language and the Spring Boot framework to provide a robust RESTful API, making it easy to communicate with the server.

On the other hand, the frontend, which is responsible for presenting data to the user and interacting with them, is located in /recApp/src/main/webapp/. It is built using React, a popular and efficient JavaScript library, which allows for the creation of highly interactive and responsive user interfaces.

### Frontend
The approach being taken is a mix between a "Functional Component" pattern and a "Page Component" pattern, where each page is its own self-contained component that handles both the functionality and layout of the page.

### Backend
The backend of the web application is built using the Spring Boot framework and follows a layered architecture approach. The application is designed to have a low coupling and high cohesion. The controller layer, which is responsible for receiving all calls from the frontend, is designed as a @RestController and handles all the API calls with endpoints. The integration layer is responsible for all the communication with the database, while the model layer contains all the models and DTOs. With this approach, it ensures that each layer is independent and can be modified without affecting the other layers, leading to a more maintainable and scalable backend.

### Database
The PostgreSQL database management system is used as the backend to store and manage all the relational data for this application.

## Installation
- If you do not already have node.js install it. Check version in your terminal with: node -v.
- Clone this git repository.
- Install all required npm packages by running the command npm install in both the root directory and the frontend directory.
- Install postgres if you don't already have it. You can check installed version by running the command: psql --version. Log in with your postgres credentials and create the database.

## Running the application in development mode
- Start your database. 
- Start the server type mvn spring-boot:run in terminal from root directory of the project or alternatively simply find the main class that has the @SpringBootApplication annotation in this case /recApp/src/main/java/com/iv1201/recapp/RecAppApplication.java Right-click on the class and select "Run as" > "Java Application".
- After starting server you may start the client by running the command `npm start` in the `frontend` directory, that being /recApp/src/main/webapp/reactjs/
- The app will open automatically on a broswer but if not then just go to any browser and hit http://localhost:3000.

## Deployment

## Developers
- Parosh Shaways
- Gustav Normelli
- Farzaneh Tajik

