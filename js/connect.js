function socketCo() {

  app.noAddress = false;
  var socket = io.connect('http://' + localStorage.lisaAddress + ":8080");

  socket.on('connect_error', function() {
    console.log('Connect error !');
    socket.close();
    app.connected = false;
  });

  socket.on('connect', function functionName() {
    console.log('Connecté!');
    app.connected = true;
  });

  socket.on('donnees', function (data) {
    app.$data.donnees = data;
  });
}


if (localStorage.lisaAddress) {
  socketCo();
} else {
  app.noAddress = true;
}
