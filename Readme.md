# Bids Application - Node.js

This is a backend application comprises of RESTful API for a real-time bidding platform using Node.js, Express and MongoDB database.
The API support advanced CRUD operations, user authentication, role-based access control and notifications.

## Tech Stack Used
- **Express.js:** A minimal and flexible Node.js web application framework
- **MongoDB:** A NoSQL database for storing JSON-like documents
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB
- **jsonwebtoken:** A library to generate and verify JSON Web Tokens (JWTs) for authentication

</br>

## Installation Guide
- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB installed and running on your machine

### Steps

1. Clone the repository
```js
git clone https://github.com/navneetkumar22/bids_app.git
cd bids_app
```

2. Install Dependencies

Install the necessary dependencies defined in package.json
```js
npm install
```

3. Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

```js
MONGODB_URI=
PORT=
JWT_SECRET
JWT_EXPIRY
```

4. Run the Application
```js
npm start
```

5. Folder Structure
```js
- /controllers
   - userControllers.js
   - notificationControllers.js
   - bidsControllers.js
   - itemControllers.js

- /models
   - userSchema.js
   - bidSchema.js
   - itemSchema.js
   - notificationSchema.js

- /routes
   - userRoutes.js
   - itemRoutes.js
   - bidRoutes.js
   - notificationRoutes.js

- /services
   - AuthRoles.js
   - multerConfig.js

- /uploads
   - contains images of all items

- app.js
- server.js

- .env
- .gitignore

- package.json

- Readme.md
```

</br>

## Routes

![screenshot](./screenshot/Mind%20Maps.jpg)

</br>