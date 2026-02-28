# camelCase Studio — MERN Stack

A full-stack web application for **camelCase Studio**, a web design & development studio. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

---

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React + Vite, Tailwind CSS  |
| Backend  | Node.js, Express.js         |
| Database | MongoDB (Mongoose)          |
| Routing  | react-router-dom            |
| HTTP     | Axios                       |

---

## Project Structure

```
camelCaseStudio/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Navbar, Hero, Marquee, Services, etc.
│   │   ├── pages/        # Home, NotFound (404)
│   │   ├── App.jsx       # Root component with routes
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles & Tailwind config
│   ├── index.html
│   └── vite.config.js
│
├── server/          # Express + Node backend
│   ├── config/db.js
│   ├── controllers/contactController.js
│   ├── middleware/errorHandler.js
│   ├── models/Contact.js
│   ├── routes/contactRoutes.js
│   ├── server.js
│   └── .env
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **MongoDB** (local or Atlas connection string)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd camelCaseStudio
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (or edit the existing one):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:

```bash
node server.js
```

### 3. Set up the client

```bash
cd client
npm install
npm run dev
```

The frontend will be available at **http://localhost:5173** and API requests will be proxied to **http://localhost:5000**.

---

## Environment Variables

| Variable    | Description                          | Default                  |
| ----------- | ------------------------------------ | ------------------------ |
| `PORT`      | Server port                          | `5000`                   |
| `MONGO_URI` | MongoDB connection string            | *(required)*             |
| `CLIENT_URL`| Allowed CORS origin                  | `http://localhost:5173`  |
| `NODE_ENV`  | Environment mode                     | `development`            |

---

## API Endpoints

| Method | Route          | Description                    |
| ------ | -------------- | ------------------------------ |
| POST   | `/api/contact` | Submit a contact enquiry       |
| GET    | `/api/contact` | Get all enquiries (admin use)  |
| GET    | `/api/health`  | Health check                   |

---

## Features

- **Landing Page** — Fully responsive, neo-brutalist design
- **Contact Form** — Client-side validation, loading states, success/error feedback
- **Smooth Scroll** — Scroll-to-section navigation
- **404 Page** — Custom themed not-found page
- **API Proxy** — Vite proxy for seamless dev experience
- **MongoDB Storage** — All contact enquiries saved to database

---

## License

© camelCase Studio 2025
