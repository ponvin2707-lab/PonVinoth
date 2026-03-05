const socket = io("http://localhost:3000");
const statusEl = document.getElementById("driverStatus");
const params = new URLSearchParams(window.location.search);
const busId = Number(params.get("bus_id")) || 1;

if (!navigator.geolocation) {
  statusEl.textContent = "Geolocation is not supported on this device.";
} else {
  navigator.geolocation.watchPosition(
    (pos) => {
      const payload = {
        bus_id: busId,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      socket.emit("locationUpdate", payload);
      statusEl.textContent = `Sent: Bus #${busId} @ ${payload.lat.toFixed(5)}, ${payload.lng.toFixed(5)}`;
    },
    (err) => {
      statusEl.textContent = `GPS error: ${err.message}`;
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 10000
    }
  );
}
