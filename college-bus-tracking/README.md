# 🚍 College Bus Tracking System

A mini project starter for real-time college bus tracking with:
- **Node.js + Express + Socket.IO** backend
- **MySQL** persistence
- **Google Maps** based student view
- **Driver GPS sender page**

## 📁 Project Structure

```
college-bus-tracking
├── backend
│   ├── .env.example
│   ├── db.js
│   ├── package.json
│   └── server.js
├── database
│   └── bus_tracking.sql
└── frontend
    ├── driver.html
    ├── driver.js
    ├── index.html
    ├── student.js
    └── style.css
```

## 1) Setup Database

1. Create/import schema:
   - Open MySQL and run `database/bus_tracking.sql`.
2. This creates tables and inserts sample bus `id=1`.

## 2) Setup Backend

```bash
cd backend
cp .env.example .env
npm install
npm start
```

Backend runs at `http://localhost:3000`.

Health API:
- `GET /api/health`

Latest location API:
- `GET /api/buses/:busId/latest-location`

## 3) Setup Frontend

Open these files in browser:
- `frontend/index.html` → student tracking map
- `frontend/driver.html?bus_id=1` → driver GPS uploader

> Replace `YOUR_API_KEY` in `frontend/index.html` with your Google Maps API key.

## 4) Demo Flow

1. Start backend.
2. Open `driver.html?bus_id=1` on a phone and allow GPS.
3. Open `index.html` on laptop.
4. Click **Track Bus** (bus id 1).
5. Students can see live updates.
