import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { faSearch , faBars , faArrowRight , faExchangeAlt , faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add( faSearch , faBars , faArrowRight , faExchangeAlt , faChevronCircleDown )

createApp(App).use(router).component('fa' , FontAwesomeIcon ).mount('#app')
