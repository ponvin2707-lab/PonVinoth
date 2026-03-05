const socket = io("http://localhost:3000");

const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 15,
  center: { lat: 13.0827, lng: 80.2707 }
});

const marker = new google.maps.Marker({
  map,
  title: "Tracked Bus"
});

const statusEl = document.getElementById("status");
const busIdInput = document.getElementById("busId");
const trackBtn = document.getElementById("trackBtn");

let activeBusId = Number(busIdInput.value) || 1;

trackBtn.addEventListener("click", () => {
  activeBusId = Number(busIdInput.value) || 1;
  statusEl.textContent = `Tracking bus #${activeBusId}…`;
});

socket.on("busLocation", (data) => {
  if (Number(data.bus_id) !== activeBusId) {
    return;
  }

  const position = {
    lat: Number(data.lat),
    lng: Number(data.lng)
  };

  marker.setPosition(position);
  map.panTo(position);
  statusEl.textContent = `Bus #${activeBusId} updated: ${position.lat.toFixed(5)}, ${position.lng.toFixed(5)}`;
});
