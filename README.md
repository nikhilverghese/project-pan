# Project Pan

**update** Spotify has made major changes to its API and archived major features that this app uses to work properly. Unfortunately what this means is that project pan will not be functional until they either revert these changes, or I have the time to figure out a solution to this. rip project pan


**Project Pan** is a centralized database for music projects that enables users to store and manage data about various songs, including their location, key, genre, BPM, and custom notes. The project is built using React for the frontend and SQLite for the backend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features
- Store detailed information about music projects, including:
  - Location
  - Key
  - Genre
  - BPM
  - Custom notes and tags
- User authentication to secure data.
- Simple and intuitive UI for managing projects.
- Integration with various music APIs for additional functionality.

## Technologies Used
- **Frontend:** React, Redux
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Deployment:** Google Cloud, Docker
- **Authentication:** Firebase

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-pan.git
   cd project-pan
Navigate to the server directory and install dependencies:

cd server
npm install

Start the server:

npm start

Usage
Open your web browser and go to http://localhost:3000.
Create an account or log in to access your music projects.
Use the provided forms to add, edit, or delete music project entries.
