# Valentine Journal - Backend README

## Overview
The backend of Valentine Journal is built using **Express.js**, providing a **secure REST API** for user authentication, journal entries, calendar events, and gallery management. It integrates with **MongoDB Atlas** for database storage and **AWS S3** for image storage. Authentication is managed through **JWT tokens**.

---

## Tech Stack
- **Node.js & Express.js** for API backend
- **MongoDB Atlas** (NoSQL database)
- **Mongoose** (ODM for MongoDB)
- **JWT Authentication** (jsonwebtoken & bcrypt)
- **AWS SDK** for S3 image storage
- **Multer** for handling image uploads
- **Dotenv** for environment variables
- **bcrypt** for password hashing

---

## Setup Instructions
### 1. Install Dependencies
```sh
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory with the following content:
```sh
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
BUCKET_NAME=your-s3-bucket-name
```

### 3. Start the Server
```sh
npm run start
```

---

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a user with a secret PIN |
| POST | `/api/auth/login` | Authenticate a user and return a JWT |
| GET | `/api/journal?date=YYYY-MM-DD` | Fetch a journal entry for a given date |
| POST | `/api/journal` | Create or update a journal entry |
| GET | `/api/calendar?date=YYYY-MM-DD` | Fetch events for a specific date |
| POST | `/api/calendar` | Create a new calendar event |
| DELETE | `/api/calendar/:id` | Delete a calendar event |
| GET | `/api/gallery` | Fetch all gallery images |
| POST | `/api/gallery/upload` | Upload an image to S3 |
| DELETE | `/api/gallery/:id` | Delete an image |

---

## Folder Structure
```
backend/
│── models/
│   ├── User.js             # User schema
│   ├── JournalEntry.js     # Journal entry schema
│   ├── CalendarEntry.js    # Calendar entry schema
│   ├── GalleryImage.js     # Gallery image schema
│── routes/
│   ├── auth.js             # Authentication routes
│   ├── journal.js          # Journal API endpoints
│   ├── calendar.js         # Calendar API endpoints
│   ├── gallery.js          # Gallery API endpoints
│── utils/
│   ├── authMiddleware.js   # Authentication middleware
│── server.js               # Express server
│── .env                    # Environment variables
│── package.json
│── README.md
```

---

## Security Considerations
- **JWT-based authentication** ensures secure access to protected routes.
- **CORS enabled** for secure cross-origin requests.
- **Secret PIN registration** ensures only authorized users can create accounts.
- **AWS S3 private storage** prevents unauthorized access to images.

---

## Deployment
The backend is optimized for deployment on **Render**.

### Steps:
1. Deploy the backend on Render:
   - Connect the backend repo to Render.
   - Add all `.env` variables.
   - Deploy.

---

## Author
Developed with ❤️ by Alfredo Pasquel.

