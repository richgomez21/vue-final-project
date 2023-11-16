import { createApp,  reactive } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/main.css";

const userJSON = sessionStorage.getItem("currentUser")
const user = userJSON ? JSON.parse(userJSON) : null;
const GStore = reactive({ currentUser: user });

createApp(App).use(router).provide('GStore', GStore).mount('#app');
