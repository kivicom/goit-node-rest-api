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

## 🖼 Avatar Upload

### Register with Gravatar
- On user registration, avatar URL is auto-generated using [gravatar](https://gravatar.com).
- Stored in `avatarURL` field in the user model.

### Upload Custom Avatar `PATCH /api/auth/avatars`
- Requires `multipart/form-data` with an image file
- Header: `Authorization: Bearer <token>`
- Stores uploaded file temporarily in `temp/` and then moves it to `public/avatars/` with a unique filename
- Updates user's `avatarURL` with final URL

**Success response:**
```json
{
  "avatarURL": "/avatars/unique-filename.jpg"
}
```

**Error response:**
```json
{
  "message": "Not authorized"
}
```

### Static File Hosting
- Express serves static files from `public/`
- Uploaded avatars accessible at: `http://localhost:<port>/avatars/<filename>`

---

## 🧪 Testing

Basic unit and integration tests are included to verify:
- User registration and login
- Auth middleware behavior
- Avatar upload process

> Run tests with:
```bash
npm test
```
