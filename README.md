# MERN E-Commerce Store

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart, and admin dashboard.

---

## Features

- User authentication (register/login)
- Product browsing with categories and search
- Shopping cart functionality
- Order history for users
- Product reviews and ratings
- Admin dashboard for managing products, orders, and users

---

## Tech Stack

- **Frontend:** React.js, Redux Toolkit, React Router, CSS (or Tailwind/Bootstrap)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt

---

## Getting Started

### 1. Clone the Repository


### 2. Install Dependencies

**Backend:**

**Frontend:**

---

### 3. Configure Environment Variables
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
Create a `.env` file inside the `server` directory:


- Replace `<username>` and `<password>` with your MongoDB Atlas credentials.
- Set `JWT_SECRET` to a secure random string.

---

### 4. Run the Application

**Start the backend server:**


cd server
npm start
**Start the frontend development server:**


cd ../client
npm start
- Frontend runs at: `http://localhost:3000`
- Backend API runs at: `http://localhost:5000/api`

# My Project

![Screenshot](images/ss-1.png)
![Screenshot](images/ss-2.png)

