const socket = io("http://localhost:3000");

navigator.geolocation.watchPosition((pos)=>{

 socket.emit("locationUpdate",{

  bus_id:1,
  lat:pos.coords.latitude,
  lng:pos.coords.longitude

 });

});
