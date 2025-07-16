# LMS Backend

A full-featured Learning Management System backend built with Node.js + PostgreSQL.

## 🚀 Features

- ✅ JWT Authentication (Login / Signup)
- ✅ Role-based access: **Admin** vs **User**
- ✅ Admin-only: Create & manage **Courses**, **Lessons**, **Quizzes**, **Questions**
- ✅ Users: View courses, enroll, complete lessons, take quizzes
- ✅ Auto-grade quiz submissions
- ✅ Lesson completion tracking with course progress %
- ✅ Pagination support for all major list routes
- ✅ Secure password hashing using **bcrypt**
- ✅ Schema validation with **Joi**
- ✅ Clean RESTful API design

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| Node.js + Express | Backend Server |
| PostgreSQL | Relational Database |
| Sequelize | ORM |
| JWT | Authentication |
| Joi | Validation |
| dotenv | Config Management |
| CORS, Helmet | Security |
| express-rate-limit | Rate limiting |
| pgAdmin / Render | Deployment & DB Hosting |


## Setup

```bash
git clone <repo-url>
cd lms-backend
npm install
cp .env.example .env
# Add DB credentials in .env
npm run seed
npm run dev

Author: Akshat Saxena
---

## 🧑‍💻 Deployment (Render)
  Push repo to GitHub
  
  Create PostgreSQL & Web Service on Render
  
  Add env vars from .env
  
  Deploy

## 📬 LMS API Endpoints (with Roles + Examples)

> Replace `{base}` with your live backend URL, e.g. `https://lms-backend.onrender.com`

---

### 🔐 Auth Routes – `{base}/api/auth`

  #### ✅ `POST /signup` — *Public*
  
  Register a new user (either `user` or `admin` role)
  
  **Request:**
  
  ```json
  {
    "fullName": "Test User",
    "email": "test@gmail.com",
    "password": "test123",
    "role": "user"
  }
  ```
  
  **Response:**
  
  ```json
  { "token": "<JWT token>" }
  ```
  
  ---
  
  #### ✅ `POST /login` — *Public*
  
  Login and receive JWT token
  
  **Request:**
  
  ```json
  {
    "email": "test@gmail.com",
    "password": "test123"
  }
  ```
  
  **Response:**
  
  ```json
  { "token": "<JWT token>" }
  ```
  
  ---
  
  ### 🎓 Course Routes – `{base}/api/courses`
  
  #### ✅ `POST /` — *Admin only*
  
  Create a new course
  
  **Request:**
  
  ```json
  {
    "title": "JavaScript Essentials",
    "description": "Learn JS basics",
    "instructor": "Admin User",
    "price": 0
  }
  ```
  
  ---
  
  #### ✅ `GET /?page=1&limit=5` — *User & Admin*
  
  Fetch paginated list of all courses
  
  **Response:**
  
  ```json
  {
    "data": [ { "id": "...", "title": "..." } ],
    "meta": { "total": 20, "page": 1, "limit": 5, "totalPages": 4 }
  }
  ```
  
  ---
  
  #### ✅ `POST /:courseId/enroll` — *User only*
  
  Enroll a user into a course
  
  **Response:**
  
  ```json
  { "message": "Enrolled successfully" }
  ```
  
  ---
  
  ### 📘 Lesson Routes – `{base}/api/courses/:courseId/lessons`
  
  #### ✅ `POST /` — *Admin only*
  
  Add a new lesson to a course
  
  **Request:**
  
  ```json
  {
    "title": "JS Variables",
    "videoUrl": "https://...",
    "resourceLink": "https://..."
  }
  ```
  
  ---
  
  #### ✅ `GET /?page=1&limit=5` — *User & Admin*
  
  Get lessons of a course
  
  ---
  
  ### 🧠 Lesson Progress – `{base}/api/lesson-progress`
  
  #### ✅ `POST /:lessonId/complete` — *User only*
  
  Mark a lesson as completed
  
  **Response:**
  
  ```json
  { "message": "Lesson marked as complete" }
  ```
  
  ---
  
  #### ✅ `GET /course/:courseId` — *User only*
  
  Get progress in a course (in %)
  
  **Response:**
  
  ```json
  {
    "courseId": "abc123",
    "completed": 3,
    "total": 6,
    "progress": "50%"
  }
  ```
  
  ---
  
  ### 📝 Quiz Routes – `{base}/api/quizzes`
  
  #### ✅ `POST /` — *Admin only*
  
  Create a quiz linked to a course
  
  **Request:**
  
  ```json
  {
    "title": "JS Quiz",
    "courseId": "abc123"
  }
  ```
  
  ---
  
  #### ✅ `GET /course/:courseId` — *User & Admin*
  
  Fetch all quizzes for a course (paginated)
  
  ---
  
  ### ❓ Question Routes – `{base}/api/questions`
  
  #### ✅ `POST /` — *Admin only*
  
  Add a question to a quiz
  
  **Request:**
  
  ```json
  {
    "quizId": "quiz123",
    "questionText": "What is === in JS?",
    "options": ["=", "==", "===", "!="],
    "correctAnswer": "==="
  }
  ```
  
  ---
  
  ### 📥 Quiz Submissions – `{base}/api/quiz-submissions`
  
  #### ✅ `POST /:quizId/submit` — *User only*
  
  Submit quiz answers (auto-graded)
  
  **Request:**
  
  ```json
  {
    "answers": {
      "questionId1": "Option A",
      "questionId2": "Option B"
    }
  }
  ```
  
  **Response:**
  
  ```json
  {
    "score": 2,
    "totalQuestions": 3
  }
  ```
  
  ---
  
  #### ✅ `GET /quiz/:quizId` — *Admin only*
  
  View all quiz submissions for a quiz
  
  #### ✅ `GET /quiz/:quizId/user` — *User only*
  
  View your personal score on a quiz

## ✅ Final Status: DONE! 🎉

backend is now:
- 🎯 Feature-complete
- 🔐 Secure
- 🚀 Ready for deployment
- 👨‍💻 Easy to maintain

---


