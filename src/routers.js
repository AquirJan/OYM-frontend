import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './pages/login.vue';
import Dashboard from './pages/dashboard.vue';
import Designer from './pages/designer.vue';
import NotFound from './pages/404.vue';
import Nonsupport from './pages/nonsupport.vue';
import Test from './pages/test.vue';
// import NotPermission from './pages/401.vue';

import { detectBrowser } from './util.js';

Vue.use(VueRouter)

const routes = [
  { 
    path: '', 
    redirect: {
			name: 'dashboard'
		}
  },
  { 
    path: '/', 
    name: 'dashboard',
    component: Dashboard 
  },
  { 
    path: '/designer', 
    name: 'designer',
    component: Designer ,
  },
  { 
    path: '/login',
    name: 'login', 
    component: Login 
  },
  { 
    path: '/404',
    name: '404', 
    component: NotFound, 
  },
  {
		path: '/nonsupport',
    name:'nonsupport',
    component: Nonsupport, 
  },
  {
		path: '/test',
    name:'test',
    component: Test, 
	},
  {
		path: '*',
		redirect: {
			name: '404'
		}
	}
];

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  
  if(detectBrowser() == 'lowerIE' && to.name!=='nonsupport'){
    next({
      name:'nonsupport',
      replace: true,
    })
  }else{ 
    next()
  }
})

export default router;