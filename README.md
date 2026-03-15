# NoteStack 📝✨
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.0-880000?style=for-the-badge&logo=mongoDB&logoColor=white)](https://mongoosejs.com/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/State_Management-Zustand-9146FF?style=for-the-badge)](https://github.com/pmndrs/zustand)

A full-stack note-taking application with React frontend and Node.js backend.

## Project Structure 🏗️

### Frontend (`/frontend`)
```
frontend/
├── public/ 
├── src/
│ ├── assets/ 
│ ├── components/
│ ├── hooks/ 
│ ├── lib/ 
│ ├── pages/ 
│ ├── stores/ # State management (Zustand)
│ ├── App.css 
│ ├── App.jsx 
│ └── main.jsx # Application entry point
├── .gitignore
├── components.json 
├── index.html
├── jsconfig.json 
├── package.json
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js # Vite configuration
```

### Backend (`/backend`)
```
backend/
├── controller/ 
├── middleware/ # Express middleware
├── model/ 
├── routers/ # API routes
├── utils/ 
├── .gitignore
├── index.js # Server entry point
└── package.json
```



## Features 🚀

- 🎨 **Rich Text Editing** - Markdown-supported note creation
- 📂 **Smart Organization** - Collections-based note management
- 🔍 **Instant Search** - Full-text search across all notes
- 🌓 **Dark Mode** - Eye-friendly theme switching
- 🗄️ **Database Backed** - MongoDB 
- 📱 **Responsive Design** - Optimized for all devices


## Tech Stack ⚙️

**Frontend**:
- React 18 with Vite
- Zustand for state management
- Tailwind CSS + shadcn/ui components
- Axios for API communication

**Backend**:
- Node.js with Express
- MongoDB (or your chosen database)
- JWT Authentication
- REST API architecture

## Getting Started 🚀


### Prerequisites
```bash
- Node.js 18+
- mongoose
- npm package manager
```

### Installation
1. Clone the repository:
```bash

```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
Copy
cd ../backend
npm install
```

4. Configure environment variables:

```bash
# In /backend create .env file with:
PORT=3000

JWT_SECRET=your_jwt_secret_key
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


EMAIL_USER=sender_email
EMAIL_PASS=sender_passkey
NODE_ENV=development
```

5. Start both servers:

```bash
# In one terminal (backend)
cd backend && npm start

# In another terminal (frontend)
cd frontend && npm dev
```
