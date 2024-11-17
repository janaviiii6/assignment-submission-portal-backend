# Assignment Submission Portal
#### This project is a Node.js-based API for managing assignment submissions. It includes features for users to upload assignments, admins to view and accept/reject assignments, and comprehensive error handling.

## Features
* User Authentication: Secure authentication using bearer tokens.
* Assignment Upload: Users can upload assignments tagged to an admin.
* Assignment Management: Admins can view, accept, or reject assignments.
* Role-Based Access Control: Separate functionalities for users and admins.

## Setup Instructions
### Prerequisites
* Node.js v14 or later
* MongoDB database
* Postman (optional for testing API)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```
    npm install
    npm install express, mongoose, cors, dotenv, bcrypt, jsonwebtoken
    npm install --save-dev nodemon
   ```
3. Configure environment variables:
   Create .env file in the project root and add:
   ```
   PORT = your_preferred_port
   MONGODB_URL = your_mongo_db_url
   SECRET_KEY = your_secret_key
   ```
4. Create .gitignore file
   ```
   /node_modules
   /.env
   ```
5. Add the start script in your package.json file:
   ```
   "scripts": {
      "start": "nodemon app.js"
   }  
   ```
6. Start the server:
   ```
   nodemon run  
   ```

## API Endpoints
### Authentication

#### Login
* Endpoint: `/auth/login`
* Method: POST
* Description: Authenticates the user and returns a JWT token
  ![image](https://github.com/user-attachments/assets/bf8b6809-0223-4269-838f-a7bf13668dae)

#### Register
* Endpoint: `/auth/register`
* Method: POST
* Description: Register new user
  ![image](https://github.com/user-attachments/assets/1f7e3185-4a9d-4505-a7c2-1d5f896f9892)

#### Assignments
* Upload Assignment
* Endpoint: `/users/upload`
* Method: POST
* Headers: Authorization: Bearer <token>
![image](https://github.com/user-attachments/assets/90f635c2-251a-462c-b163-fa6697201767)

#### View All Assignments
* Endpoint: `/admin/assignments`
* Method: GET
* Headers: Authorization: Bearer <admin-token>
![image](https://github.com/user-attachments/assets/246a7e99-1839-4fdd-a59d-13591add60d5)

#### Accept Assignment
* Endpoint: `/admin/assignments/:id/accept`
* Method: PUT
* Headers: Authorization: Bearer <admin-token>
![image](https://github.com/user-attachments/assets/c70e3077-02d6-4855-b803-fad0ea2952ca)

#### Reject Assignment
* Endpoint: `/admin/assignments/:id/reject`
* Method: PUT
* Headers: Authorization: Bearer <admin-token>
![image](https://github.com/user-attachments/assets/bca2db6f-e9ff-4622-9ca1-65b3c58b47c8)

#### Error Handling
* 404 Not Found: If the assignment or user does not exist.
* 403 Unauthorized: If a user tries to access assignments not tagged to them.
* 500 Internal Server Error: For unexpected server errors.
