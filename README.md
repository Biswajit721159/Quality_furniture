# Project Description
This project is a MERN stack e-commerce app.

# Backend
The backend is written in Node.js.

# Frontend
The frontend is written in React.js.

# Database
The database is MongoDB.

# Instructions for Environment Variables

## Frontend
In the `frontend` folder, you need to create an `.env` file. The file should contain:

REACT_APP_API="" # write your  backend API end point
REACT_APP_CLOUDINARY_CLOUD_NAME=""
REACT_APP_CLOUDINARY_API_KEY=""
REACT_APP_CLOUDINARY_API_SECRET=""
REACT_APP_CLOUDINARY_UPLOAD_PRESET=""


## Backend
In the `backend` folder, you need to create an `.env` file. The file should contain:

MONGODB_URI=""
DB_NAME=""
ACCESS_TOKEN_SECRET=""
ACCESS_TOKEN_EXPIRY=""
REFRESH_TOKEN_EXPIRY=""
REFRESH_TOKEN_SECRET=""
ADMIN_ACCESS_TOKEN_EXPIRY=""
api_secret="" # CLOUDINARY api_secret
api_key="" # CLOUDINARY api_key
cloud_name="" # CLOUDINARY cloud_name



## Admin Panel
In the `adminpanel` folder, you also need to create an `.env` file. The file should contain:

REACT_APP_API=""  # write your  backend API end point