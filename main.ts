import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import DataVVue3 from '@kjgl77/datav-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)

app.use(router).use(ElementPlus, { locale }).use(DataVVue3).mount('#app')
