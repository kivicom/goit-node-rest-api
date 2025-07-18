# goit-node-rest-api

**REST API**

A simple RESTful API for managing a contact list using PostgreSQL and Sequelize.

---

## 📁 Project Structure

- `controllers/contactsControllers.js` – Route controllers  
- `services/contactsServices.js` – Logic for database operations via Sequelize  
- `schemas/contactsSchemas.js` – Joi validation schemas  
- `routes/api/contacts.js` – Route definitions  
- `db/Contact.js` – Sequelize model definition  
- `db/sequelize.js` – PostgreSQL connection setup  

---

## 🔌 API Endpoints

### GET `/api/contacts`
- Returns a list of all contacts  
- **Status:** `200 OK`

### GET `/api/contacts/:id`
- Returns a contact by `id`  
- **Status:** `200 OK` or `404 Not Found`

### DELETE `/api/contacts/:id`
- Deletes a contact by `id`  
- **Status:** `200 OK` or `404 Not Found`

### POST `/api/contacts`
- Creates a new contact  
- Required fields: `name`, `email`, `phone`  
- **Validation:** Joi schema  
- **Status:** `201 Created` or `400 Bad Request`

### PUT `/api/contacts/:id`
- Updates an existing contact  
- Accepts any subset of: `name`, `email`, `phone`  
- Must contain at least one field  
- **Validation:** Joi schema  
- **Status:** `200 OK`, `400 Bad Request`, or `404 Not Found`

### PATCH `/api/contacts/:id/favorite`
- Updates the `favorite` status of a contact  
- Required field in body: `favorite` (boolean)  
- **Validation:** Joi schema  
- **Status:** `200 OK`, `400 Bad Request`, or `404 Not Found`

---

## 🧱 Database

- PostgreSQL database hosted on Render
- Sequelize ORM for model definition and queries
- Sequelize model:  
  ```js
  {
    name: STRING,
    email: STRING,
    phone: STRING,
    favorite: BOOLEAN (default: false)
  }
  ```

---

## 🔐 Authentication & Authorization (JWT)

### Register `POST /api/auth/register`
- Registers a new user
- Required: `email`, `password`
- **Status:** `201 Created`, `400 Bad Request`, or `409 Conflict`

### Login `POST /api/auth/login`
- Logs in a user and returns a token
- Required: `email`, `password`
- **Status:** `200 OK`, `400 Bad Request`, or `401 Unauthorized`

### Get Current User `GET /api/auth/current`
- Returns logged-in user's info
- Header: `Authorization: Bearer <token>`
- **Status:** `200 OK` or `401 Unauthorized`

### Logout `POST /api/auth/logout`
- Logs out a user (clears token)
- Header: `Authorization: Bearer <token>`
- **Status:** `204 No Content` or `401 Unauthorized`

### 🔒 Protected Routes
All routes under `/api/contacts` require valid JWT.
Use `Authorization: Bearer <token>` header.

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or a similar tool to test the API endpoints.

Make sure to create `.env` with your PostgreSQL connection string:

```
DB_HOST=your_host
DB_PORT=5432
DB_NAME=db-contacts
DB_USER=username
DB_PASSWORD=password
```
