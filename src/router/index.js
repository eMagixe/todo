import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../views/Index';
import Edit from '../views/Edit';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    { path: '/edit/:id', component: Edit }
];

export default new VueRouter({
    mode: 'history',
    routes
});
