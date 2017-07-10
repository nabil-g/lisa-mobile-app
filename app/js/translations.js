Vue.use(VueI18n);

const messages = {
  en: {
    text: {
      weather_legend: 'Last update',
      alarm : 'Alarm',
      reminders_title: 'Reminders',
      reminders_select_date: 'Select date',
      reminders_select_time: 'Select time',
      reminders_text_read: 'Text to be read',
      reminders_add: 'Add',
      settings_title: 'Settings',
      settings_general: 'General',
      settings_language: 'App language',
      settings_voice_language: 'Voice recognition and speech synthesis language',
      settings_music: 'Music on wake',
      settings_mail : 'E-mail settings',
      settings_mail_enable : 'Enable',
      settings_mail_host: 'Host server',
      settings_mail_username: 'Username (address)',
      settings_mail_pswd: 'Password',
      settings_weather: 'Weather',
      settings_weather_api: 'API key',
      settings_weather_city: 'City ID',
      settings_weather_units: 'Temperature units',
      settings_stop: 'Stop Lisa',
      settings_shutdown: 'Shutdown the server',
      login_text: 'To log into Lisa, please enter its IP address over your local network.',
      login_connect: 'Connect'
    }
  },
  fr: {
    text: {
      weather_legend: 'Dernière mise à jour',
      alarm : 'Alarme',
      reminders_title: 'Rappels',
      reminders_select_date: 'Sélectionnez la date',
      reminders_select_time: "Sélectionnez l'heure",
      reminders_text_read: 'Texte à lire',
      reminders_add: 'Ajouter',
      settings_title: 'Paramètres',
      settings_general: 'Général',
      settings_language: "Langue de l'application",
      settings_voice_language: 'Langue de la reconnaissance et de la synthèse vocale',
      settings_music: 'Musique au réveil',
      settings_mail : "Paramètres d'e-mail",
      settings_mail_enable : 'Activer',
      settings_mail_host: 'Adresse du serveur',
      settings_mail_username: 'Adresse e-mail',
      settings_mail_pswd: 'Mot de passe',
      settings_weather: 'Météo',
      settings_weather_api: "Clé d'API",
      settings_weather_city: 'N° ville',
      settings_weather_units: 'Unités de température',
      settings_stop: 'Interrompre Lisa',
      settings_shutdown: 'Éteindre le serveur',
      login_text: 'Pour vous connecter au serveur Lisa, entrez son adresse IP sur le réseau local.',
      login_connect: 'Connecter'
    }
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages
});
