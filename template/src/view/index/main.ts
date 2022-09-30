import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';
import router from '../../router';
import store from '../../store';
import '@/assets/js/publicpath';
import ElementPlus, { ElMessage } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import '../../assets/css/skin.scss';
import * as ElementPlusIconsVue from '@/assets/js/icon';
import { Toolbar, Search, SearchItem, Http, Permission } from 'ct-dart3';

const app = createApp(App);
app.config.globalProperties.$bus = mitt();
const showErrorMessage = (msg: string) => {
  ElMessage({
    message: msg || 'error',
    type: 'error',
  });
};
app
  .use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
  .use(ElementPlusIconsVue)
  .use(Toolbar)
  .use(Search)
  .use(SearchItem)
  .use(Http, {
    interceptError(res: any) {
      const data: any = JSON.parse(JSON.stringify(res).toLowerCase());
      showErrorMessage(data.message);
    },
    interceptorSuccess(res: any) {
      const data: any = JSON.parse(JSON.stringify(res).toLowerCase());
      // 对响应成功数据做点什么
      if (res.code !== 0) {
        showErrorMessage(data.message);
      }
    },
    timeout: 60000,
  })
  .use(Permission, {
    //设置权限别名
    alias: {
      add: 1,
      del: 2,
      edit: 3,
      view: 4,
    },
    router: router,
  })
  .use(store)
  .use(router);
Http.axios
  .get('http://yapi.tcy365.org:3000/mock/230/api/permission')
  .then(function (res: any) {
    if (res.data.code === 0) {
      Permission.success([1, 2, 3]); //初始化 权限 数据
      app.mount('#app');
      return;
    }
    Permission.go403(); //无权限提示
  })
  .catch(function () {
    showErrorMessage('权限获取错误');
  });
