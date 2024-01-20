# Frontend Quiz

A interactive quiz application that test and enhance knowledge in key areas of frontend development, focusing on JavaScript, CSS, HTML, and accessibility principles.

## Table of contents

- [Screenshots](#screenshots)

- [Features](#features)

- [Links](#links)

- [Tech Stack](#tech-stack)

- [What I learned](#what-i-learned)

### Screenshots

![Quizzes](/client/public/screenshots/home.png)

![Question](/client/public/screenshots/question.png)

![Answer](/client/public/screenshots/answer.png)

![Score](/client/public/screenshots/score.png)

### Features

- Quiz attempts are recorded in a database and an average score is displayed for each quiz.

- Confetti animation for scores greater than or equal to 80%.

- 30 Second time limit for each question

### Links

- URL: [https://app-quiz-eta.vercel.app/](https://app-quiz-eta.vercel.app/)

### Tech Stack

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)&nbsp;![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### What I Learned

#### Routing

This was my first project using the new React Router API. I liked the API design of constructing your routes in the top level file. I did have to handle dynamic routes and load different questions based on the route. For example, the route was setup like /quiz/:quizId and I would get the quizId param and I would use the loader function to access the param and retrieve the questions from the db

#### Accessibility

I wanted to make sure that the application was accessible to keyboard users. So, I had the answers in the form of a radio group. This would allow the user to toggle through the answers using the arrow keys. I did have to modify the radio button to look like an answer and not the native presentation. I also, placed the radio elements within a form element, so that the user can select an answer by hitting the enter key. In other words, this application can be utilized without a pointer device like a mouse.

#### Backend

For my backend, I used Express.js and Node.js to setup my server and I used node-postgres to communicate with the DB. For my routes, I used validation middleware using ZOD to ensure that the correct format was being sent. Any routes not defined were resolved with a error handler middleware that resulted in a 404. I also used helmet, just to provide some security to my API.

#### Isolated Monorepo

For this project, I decided to seperate the frontend and backend in their seperate folders. This was a little confusing because I had to figure out how to host this project. What I was going to do initially was host the two parts on a single server and use some proxy to communicate between the two. However, I decided to host the backend on Railway and the frontend on Vercel. I think this is a good choice because my db is also hosted on Railway, so the backend and the server are in close proximity. And with Vercel, I can take advantage of their edge deployments.
