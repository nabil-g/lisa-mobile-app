
if (localStorage.lisaAddress) {
  socketCo();
} else {
  app.$f7.loginScreen();
}

if (localStorage.appLanguage) {
  i18n.locale = localStorage.appLanguage;
  app.appLanguage = localStorage.appLanguage;
} else {
  app.appLanguage = 'en';
}

function socketCo() {
  var socket = io.connect('http://' + localStorage.lisaAddress + ":8080");
  app.socket = socket;
// events
  app.socket.on('connect_error', function() {
    console.log('Connect error !');
    socket.close();
    app.$f7.closeModal();
    app.$f7.loginScreen();

    if (app.appLanguage == "en") {
      app.$f7.alert("<b>Error</b> : offline. Check your local network or the server address.",["Lisa"]);
    } else {
      app.$f7.alert("<b>Erreur</b> : problème de connexion. Vérifiez votre réseau local ou l'adresse du serveur Lisa.",["Lisa"]);
    }

  });

  socket.on('connect', function () {
    console.log('Connecté!');
    app.$f7.closeModal();
  });

  socket.on('client', function (data) {
    socket.close();
    app.$f7.closeModal();
    app.$f7.loginScreen();

    if (app.appLanguage == 'en') {
      app.$f7.alert("Another client is connected ! Address : " + data ,["Lisa"]);
    } else {
      app.$f7.alert("Un autre client s'est connecté ! Adresse : " + data ,["Lisa"]);
    }
  });

  socket.on('musicPlaying', function (data) {
    app.musicStatus.musicPlaying = data;
  });

  socket.on('musicTrack', function (data) {
    app.musicStatus.musicTrack = data;
  });

  socket.on('musicRepeat', function (data) {
    app.musicStatus.musicRepeat = data;
  });

  socket.on('musicShuffle', function (data) {
    app.musicStatus.musicShuffle = data;
  });

  socket.on('settings', function (data) {
    app.settings = data;
  });

  socket.on('weather', function (data) {
    app.weather = data;
  });

}
