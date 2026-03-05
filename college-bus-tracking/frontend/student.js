const socket = io("http://localhost:3000");

const map = new google.maps.Map(document.getElementById("map"),{
 zoom:15,
 center:{lat:13.0827,lng:80.2707}
});

const marker = new google.maps.Marker({
 map:map
});

socket.on("busLocation",(data)=>{

 marker.setPosition({
  lat:data.lat,
  lng:data.lng
 });

});
