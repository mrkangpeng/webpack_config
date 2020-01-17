/*
 * @Description: main.js
 * @Autor: kangpeng
 * @Date: 2020-01-14 14:51:13
 * @LastEditors  : kangpeng
 * @LastEditTime : 2020-01-17 16:08:01
 */
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import './assets/css/normalize.css'
import './assets/css/element-variables.scss'
Vue.use(Element,{size:'small',zIndex:3000})
new Vue({
    render:h => h(App)
}).$mount('#app')
