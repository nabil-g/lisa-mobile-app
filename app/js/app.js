Vue.use(Framework7Vue);

var app = new Vue({
  el: "#app",
  framework7: {
    root: '#app',
    routes: [],
    material: true
  },
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
    settings: {
        mail : {
          enabled : undefined,
          username : undefined,
          password : undefined,
          host : undefined
        },
        alarm : {
          enabled : undefined,
          music_onwake : undefined,
          secondes:undefined,
          minutes:undefined,
          heures:undefined,
          jour_mois:undefined,
          mois:undefined,
          jour_semaine:undefined
        },
        weather :{
          weather_id : undefined,
          cityID : undefined,
          units : undefined
        },
        present : undefined,
        appLanguage : undefined,
        voiceLanguage: undefined,
        sentences : {
          wakeup : undefined
        },
        devices : [],
        defaultAnswers: {},
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
        if (confirm('Voulez-vous vraiment interrompre Lisa ?')) {
          this.socket.emit("cmd", "stop");
        }
      },
      shutdown: function () {
        if (confirm('Voulez-vous vraiment éteindre le serveur ?')) {
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
  computed: {
    degreesUnits: function () {
      if (this.settings.weather.units == "imperial") {
        return "F";
      } else if (this.settings.weather.units == "metric") {
        return "C";
      }
      else {
        return "K";
      }
    },
    alarmTime: {
      get: function () {
        return this.settings.alarm.heures + ":" + this.settings.alarm.minutes;
      },
      set: function (value) {
        var time = value.split(':');
        this.settings.alarm.heures = time[0];
        this.settings.alarm.minutes = time[1];
      }
    },
    reminderFormFilled: function () {
      if (this.inputTime && this.inputDate && this.inputReminderText) {
        return true;
      }
    }
  },
  filters: {
    moment: function (value) {
      moment.locale(app.settings.appLanguage);
      return moment.unix(value).format('lll');
    },
    round: function (value) {
      return Math.round(value);
    },
    capitalize: function (value) {
      return value.toUpperCase();
    }
  }
});

// watchers
app.$watch('settings',function () {
      app.socket.emit('settings', app.settings);
      app.socket.emit('refresh', "");
  }, {
  deep: true
});
