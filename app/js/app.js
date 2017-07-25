Vue.use(Vuetify);

var app = new Vue({
  el: "#app",
  i18n,
  data: {
    inputDate: '',
    inputTime: '',
    inputReminderText: '',
    address: localStorage.lisaAddress,
    musicStatus: {
      musicPlaying: undefined,
      musicTrack: undefined,
      musicRepeat: undefined,
      musicShuffle: undefined
    },
    weather: undefined,
    socket: undefined,
    appLanguage: undefined,
    settings: {
        mail: {
          enabled: undefined,
          username: undefined,
        },
        alarm: {
          enabled: undefined,
          music_onwake: undefined,
          secondes:undefined,
          time: undefined,
          weekday:undefined
        },
        weather: {
          weather_id: undefined,
          cityID: undefined,
          units: undefined
        },
        present: undefined,
        voiceLanguage: undefined,
        sentences: {
          wakeup: undefined
        },
        reminders: []
      }
  },
  methods: {
      connect: function () {
        localStorage.lisaAddress = this.address;
        socketCo();
      },
      next: function () {
        this.socket.emit('music', 'next');
      },
      previous: function () {
        this.socket.emit('music', 'previous');
      },
      togglePlay: function () {
        this.musicStatus.musicPlaying = ! this.musicStatus.musicPlaying;
        this.socket.emit('music', 'togglePlay');
      },
      toggleShuffle: function () {
        this.musicStatus.musicShuffle = !this.musicStatus.musicShuffle;
        this.socket.emit('music', 'shuffle');
      },
      toggleRepeat: function () {
        this.musicStatus.musicRepeat = !this.musicStatus.musicRepeat;
        this.socket.emit('music', 'repeat');
      },
      stop: function () {
        this.musicStatus.musicPlaying = false;
        this.socket.emit('music', 'stop');
      },
      stopLisa: function () {
        if (this.appLanguage == 'fr') {
          var stopQuestion = 'Voulez-vous vraiment interrompre Lisa ?' ;
        } else {
          var stopQuestion = 'Do you really want to stop Lisa ?' ;
        }

        if (confirm(stopQuestion)) {
          this.socket.emit("cmd", "stop");
        }
      },
      shutdown: function () {
        if (this.appLanguage == 'fr' ) {
          var shutQuestion = 'Voulez-vous vraiment éteindre le serveur ?';
        } else {
          var shutQuestion = 'Do you really want to shutdown the server ?';
        }

        if (confirm(shutQuestion)) {
          this.socket.emit('cmd',"shutdown");
        }
      },
      refresh: function () {
        this.socket.emit('refresh',"");
      },
      addReminder: function () {
        this.settings.reminders.unshift({date: this.inputDate, time: this.inputTime, text: this.inputReminderText});
        this.inputDate = '';
        this.inputTime = '';
        this.inputReminderText = '';
      },
      deleteReminder: function (index) {
        this.settings.reminders.splice(index,1);
      }
  },
  watch: {
    appLanguage: function () {
      i18n.locale = this.appLanguage;
      localStorage.appLanguage = this.appLanguage;
    }
  },
  computed: {
    reminderFormFilled: function () {
      if (this.inputTime && this.inputDate && this.inputReminderText) {
        return true;
      }
    }
  },
  filters: {
    momentUnix: function (value) {
      moment.locale(app.appLanguage);
      return moment.unix(value).calendar();
    },
    momentCal: function (value) {
      moment.locale(app.appLanguage);
      return moment(value).format('lll');
    },
    convert: function (value) {
      if(app.settings.weather.units == "imperial") {
        return Math.round(value);
      } else {
        return Math.round((value - 32) * (5/9));
      }
    },
    degreesUnits: function (value) {
      if (value == "imperial") {
        return "F";
      } else {
        return "C";
      }
    },
    capitalize: function (value) {
      return value.toUpperCase();
    }
  }
});

// watchers
app.$watch('settings',function () {
      app.socket.emit('settings', app.settings);
  }, {
  deep: true
});
