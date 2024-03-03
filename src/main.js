import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import vuetify from './plugins/vuetify';
import pinia from "./plugins/pinia";
import './scss/style.scss';
import './plugins/axios';


/* if you want to use locale pt
import './plugins/yup'
*/

const app = createApp(App)
app
    .use(router)
    .use(vuetify)
    .use(pinia)
    .mount('#app')

