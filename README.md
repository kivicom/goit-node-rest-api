# goit-node-rest-api

**REST API**

A simple RESTful API for managing a contact list.

---

## 📁 Project Structure

- `controllers/contactsControllers.js` – Route controllers  
- `services/contactsServices.js` – Logic for reading/writing contacts  
- `schemas/contactsSchemas.js` – Joi validation schemas  
- `routes/api/contacts.js` – Route definitions  

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

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or a similar tool to test the API endpoints.
