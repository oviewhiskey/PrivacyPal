# 📱 PrivacyPal

PrivacyPal is a web application designed to promote **privacy and cybersecurity awareness** among staff at different organizational levels. It provides daily security tips, engaging games, personal reminders, and a reporting feature to foster a security-conscious workplace.

## 🚀 Features
- **User Roles**
  - Top Level: Access to Daily Tips.
  - Mid Level: Access to Daily Tips, Game Zone, Reminder.
  - Entry Level: Access to Daily Tips, Game Zone, Reminder, Report Issues.

- **Authentication**
  - User Sign Up & Sign In.
  - Admin Login (Default: Name - Victor, Email - voviewhiskey@3consult-ng.com).

- **Daily Tips**
  - Six Categories: Password Security, Mobile Security, Wi-Fi Safety, Social Engineering, Office Safety.
  - Tips can be added/removed by the Admin.

- **Game Zone**
  - Three Games: Quiz, Drag and Drop, True/False.
  - Available for Mid Level and Entry Level users.

- **Reminders**
  - Users can set personal cybersecurity-related reminders.

- **Reporting**
  - Entry Level users can submit privacy-related reports (anonymous or not).
  - Reports are visible on the Admin Dashboard.

- **Admin Dashboard**
  - Manage Daily Tips.
  - View Submitted Reports.
  - Track User Engagement (percentage of active users).

## 🛠️ Tech Stack
- **Frontend:** JavaScript, Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** SQLite

## 📂 Project Structure
```
PrivacyPal/
├── client/               # Frontend (React + Tailwind)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── assets/
│       ├── App.js
│       └── index.js
├── server/               # Backend (Node.js + Express)
│   ├── db.js             # SQLite database connection
│   ├── routes/           # API Routes
│   ├── controllers/      # Business Logic
│   └── server.js
├── package.json
└── README.md
```

## 🔑 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/privacypal.git
   ```

2. Navigate to the project directory:
   ```bash
   cd privacypal
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

6. Start the frontend:
   ```bash
   npm run dev
   ```

7. Access the app at:  
   ```
   http://localhost:3000
   ```

## 🎨 UI Style
- Primary Color: Orange (#FFA500)
- Modern, colorful, responsive design
- Smooth transitions and rounded components

## 📋 Future Improvements
- Email notifications for reminders
- More advanced user analytics
- Admin role management
- Game progress tracking

## 👤 Admin Credentials (for now)
- Name: Victor
- Email: voviewhiskey@3consult-ng.com
