# 🌍 TravelNest (Wanderlust)

A full-stack web application that allows users to explore, create, and review travel listings.  
Built with a secure authentication system and scalable backend architecture, this project simulates a real-world travel accommodation platform.

---

## 🚀 Features

- 🔐 User Authentication (Register/Login/Logout using Passport.js)
- 🏡 Create, Edit, and Delete Listings (CRUD operations)
- ⭐ Add, edit, and delete reviews with star ratings
- 🗺️ Map integration with geocoding (Mapbox)
- 📸 Image upload support (Cloudinary + Multer)
- 🗂️ Category-based listing browsing
- 👤 User profiles with listing and review history
- 🧾 Session-based authentication with persistent login
- ✅ Server-side validation using Joi schemas
- ⚠️ Custom error handling with async wrapper utility
- 🏗️ MVC Architecture for clean and scalable code structure
- 🌐 Responsive UI using EJS templating with reusable partials

---

## 🛠️ Tech Stack

### 💻 Backend
- Node.js
- Express.js

### 🗄️ Database
- MongoDB (Atlas)
- Mongoose

### 🔐 Authentication & Security
- Passport.js
- express-session
- connect-mongo
- bcrypt

### ☁️ Cloud & Media
- Cloudinary (image storage)
- Multer (file upload middleware)

### 🗺️ Maps & Geocoding
- Mapbox GL JS
- Geocoding API

### ✅ Validation
- Joi (schema validation)

### 🎨 Frontend
- EJS
- CSS

---

## 📂 Project Structure

```
travelnest/
│
├── controllers/                  # Business logic
│   ├── allReviews.js
│   ├── listings.js
│   └── users.js
│
├── init/                         # Database seeding
│   ├── data.js
│   └── index.js
│
├── models/                       # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/                       # Static assets
│   ├── css/
│   │   ├── rating.css
│   │   ├── show.css
│   │   └── style.css
│   └── javascript/
│       ├── map.js
│       ├── script.js
│       └── show.js
│
├── routes/                       # Express route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── uploads/                      # Uploaded files (Cloudinary)
│
├── utils/                        # Custom utilities
│   ├── ExpressError.js
│   ├── geocode.js
│   └── wrapAsync.js
│
├── views/                        # EJS templates
│   ├── includes/
│   │   ├── delConfirmation.ejs
│   │   ├── delpopup.ejs
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   ├── formRatings.ejs
│   │   ├── home.ejs
│   │   ├── navbar.ejs
│   │   ├── reviewForm.ejs
│   │   └── showReview.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── category.ejs
│   │   ├── edit.ejs
│   │   ├── editReview.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── users/
│   │   ├── login.ejs
│   │   ├── profile.ejs
│   │   ├── signup.ejs
│   │   ├── userList.ejs
│   │   └── userReviews.ejs
│   └── error.ejs
│
├── .gitignore
├── app.js                        # Entry point
├── cloudConfig.js                # Cloudinary configuration
├── middleware.js                 # Custom middleware
├── package.json
└── schema.js                     # Joi validation schemas
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chaurasiya-aman/travelnest.git
cd travelnest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 4. Run the application

```bash
node app.js
```

Open in browser: 👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 Live Demo

👉 *Add your deployed link here (Render / Railway / etc.)*

---

## 📸 Screenshots

> Add screenshots here for better presentation

---

## 📌 Future Enhancements

- 💳 Payment integration (Razorpay / Stripe)
- 🔍 Advanced search and filters
- 📱 Modern UI with React frontend
- 📩 Email notifications for bookings
- 🌟 Listing wishlist / favourites feature

---

## 🔒 Important Notes

- ❌ Do **NOT** push `.env` file to GitHub
- ✅ Add `.env` in `.gitignore`
- 🔐 Use a strong session secret
- ☁️ Use MongoDB Atlas for cloud database

---

## 📧 Contact

- **GitHub:** [https://github.com/chaurasiya-aman](https://github.com/chaurasiya-aman)

---

## ⭐ Acknowledgement

This project was built to gain hands-on experience in full-stack development, authentication systems, and scalable backend architecture.

⭐ If you like this project, don't forget to give it a star!
