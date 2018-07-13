import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/personal/main', '^pages/index/main', 'pages/face/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: 'green',
      list: [{
        pagePath: 'pages/index/main',
        text: '智家'
      }, {
        pagePath: 'pages/face/main',
        text: '人脸识别'
      }, {
        pagePath: 'pages/personal/main',
        text: '我的'
      }]
    }
  }
}
