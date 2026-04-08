# 🏘 Neighbourhood Marketplace

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node.js](https://img.shields.io/badge/node.js-v18.x-green)
![React](https://img.shields.io/badge/react-v18.x-blue)

📅 **Project:** Neighbourhood Marketplace  
💻 **Track:** Web Development  
👥 **Team Leader:** Sanjana Yadav    

---

## Overview
Neighbourhood Marketplace is a **web platform** that allows users to browse local services, book appointments, and manage payments easily. It simplifies **service discovery, booking management, and compliance** for local service providers and users.

---

## Features
- ✅ **User Authentication**: Register/Login securely.  
- ✅ **Service Listings**: Browse services with details and pricing.  
- ✅ **Booking System**: Book services by selecting date, time, and location.  
- ✅ **Price Validation**: Ensures required fields like price are set correctly.  
- ✅ **Booking Management**: Users can view and manage their bookings.  
- ✅ **Admin Panel**: Update booking statuses, view all bookings.  
- ✅ **Notifications**: Real-time confirmation for new bookings.  
- ✅ **Responsive UI**: Works on desktop and mobile devices.  

---

## Tech Stack

**Frontend:**
- React.js  
- Axios  
- Tailwind CSS  

**Backend:**
- Node.js & Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- RESTful API  

**Tools & Utilities:**
- VS Code  
- Postman  
- Git & GitHub  

---

## Getting Started

### Prerequisites
- Node.js >= 18.x  
- MongoDB (local or cloud)  
- npm or yarn  

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/neighbourhood-marketplace.git
```
2. **Install backend dependencies**
- cd neighbourhood-marketplace/backend
- npm install
  
3. **Install frontend dependencies**
- cd ../frontend
- npm install
  
4.**Create .env file in backend**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```
5. **Run backend server**
- cd backend
- npm run dev
  
6. **Run frontend server**
- cd frontend
- npm start
  
7. **Open in browser**
- http://localhost:5173
  
---
# API Documentation

## User Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login user |

## Booking Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/bookings` | Create a new booking |
| `GET` | `/bookings/my-bookings` | Get all bookings for logged-in user |
| `PATCH` | `/bookings/:id/status?key=admin123` | Update booking status (Admin only) |
| `GET` | `/bookings?key=admin123` | Get all bookings (Admin only) |

## Service Routes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/services` | Fetch all services |
| `POST` | `/services` | Add new service (Admin) |

---
## Contributing
- Fork the repository
- Create your branch: git checkout -b feature/your-feature
- Commit your changes: git commit -m "Add new feature"
- Push to the branch: git push origin feature/your-feature
- Create a pull request
---
## License

- This project is open source and available under the MIT License


Made with ❤️ by Team WebVerse


