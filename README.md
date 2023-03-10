# IV1201-Group-9
In this repository is the front-end for the Job Applicaton project in course IV1201 VT23 Arkitektur och design av globala applikationer. The README file is a description of the project and instructions on how to deploy the project. For working application using the front-end client, see https://frontend-iv1201-group9.herokuapp.com/

## Project Description 

The aim of the project for this course is to learn how to make good choices about the architecture in order to create a web application that meets high standards and is easily built upon by other developers. This ensures that the code is flexible and clear, making it convenient for others to continue working on the project.

The web application serves as a tool for people to register and apply for a job at an amusement park. Individuals can log in using their credentials and submit their job application.  See https://github.com/IV1201-Group-9/IV1201-Group-9-backend for server-application meant to be used together with this front-end.

## Tools and Frameworks
Below are some of the tools and framworks used for this front-end application:
- Node
- npm
- React
- ChakraUI

## Architecture
This front-end application is responsible for presenting data to the user and interacting with them, is located in /recApp/src/main/webapp/. It is built using React, a popular and efficient JavaScript library, which allows for the creation of highly interactive and responsive user interfaces.

The approach being taken is a mix between a "Functional Component" pattern and a "Page Component" pattern, where each page is its own self-contained component that handles both the functionality and layout of the page.

## Installation
- If you do not already have node.js install it. Check version in your terminal with: node -v.
- Clone this git repository.
- Install all required npm packages by running the command npm install in both the root directory and the frontend directory.

## Running the application in development mode
- Start the client by running the command `npm start` in the `frontend` directory, that being /recApp/src/main/webapp/reactjs/
- The app will open automatically on a broswer but if not then just go to any browser and hit http://localhost:3000.

## Deployment
The deployed front-end application can be viewed at https://frontend-iv1201-group9.herokuapp.com/ which is a test end-point. For deploying new versions of this application the main branch of this repository has to be manually deployed using HEROKU.

## Developers
- Parosh Shaways
- Gustav Normelli
- Farzaneh Tajik

