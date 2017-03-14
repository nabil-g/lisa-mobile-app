Vue.use(Framework7Vue);

Vue.component('page-addServices',{
  props:['caca'],
  template:'<f7-page name="addServices"><f7-navbar><f7-nav-left><f7-link icon-material="keyboard_arrow_left"  back></f7-link></f7-nav-left><f7-nav-center>Add a service</f7-nav-center><f7-nav-right><f7-link icon="icon-gear"></f7-link></f7-nav-right></f7-navbar><f7-block>{{caca}}</f7-block></f7-page>'
});

Vue.component('page-settings',{
  template:'<f7-page name="settings"><f7-navbar><f7-nav-left><f7-link icon-material="keyboard_arrow_left"  back></f7-link></f7-nav-left><f7-nav-center>Settings</f7-nav-center><f7-nav-right><f7-link icon="icon-gear"></f7-link></f7-nav-right></f7-navbar><f7-block></f7-block></f7-page>'
});

var app = new Vue({
  el: "#app",
  framework7: {
    root: '#app',
    routes: [
      {
        path: '/add/',
        component: 'page-addServices'
      },
      {
        path: '/settings/',
        component:'page-settings'
      }
    ]
  },
  data: {
    caca:"pipi",
    connected: undefined,
    noAddress: false,
    address: localStorage.lisaAddress
  },
  methods: {
      connect: function () {
        localStorage.lisaAddress = this.address;
        socketCo();
      },
      reconnect: function () {
        socketCo();
      },
      changeAddress: function () {
        this.noAddress = true;
        localStorage.removeItem('lisaAddress');
      }
  }
});
