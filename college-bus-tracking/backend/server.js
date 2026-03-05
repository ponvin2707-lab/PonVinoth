const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/buses/:busId/latest-location", (req, res) => {
  const { busId } = req.params;

  db.query(
    "SELECT bus_id, lat, lng, timestamp FROM locations WHERE bus_id = ? ORDER BY id DESC LIMIT 1",
    [busId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch location" });
      }

      if (!rows.length) {
        return res.status(404).json({ error: "No location found for this bus" });
      }

      return res.json(rows[0]);
    }
  );
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("locationUpdate", (data) => {
    const { bus_id, lat, lng } = data;

    if (!bus_id || typeof lat !== "number" || typeof lng !== "number") {
      return;
    }

    db.query(
      "INSERT INTO locations (bus_id, lat, lng) VALUES (?,?,?)",
      [bus_id, lat, lng],
      (err) => {
        if (err) {
          console.error("Failed to save location:", err.message);
          return;
        }

        io.emit("busLocation", data);
      }
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
