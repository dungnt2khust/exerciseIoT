import Vue from "vue";
const signalR = require("@aspnet/signalr");
Vue.prototype.$SignalR = {};

Vue.prototype.$SignalR = new signalR.HubConnectionBuilder()
  .withUrl(`https://iotandapp.eddieonthecode.xyz/hub/signalr`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default Vue;
