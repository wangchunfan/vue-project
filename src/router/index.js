import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',//默认hash `#`
  routes: [
    {
      //path: '/goods/:goosdId/user/:userName', //动态路由
      //path: '/goods',
      //访问根目录
      path: '/goods',
      name: 'GoodsList',
      //component: GoodsList,

      //命名视图
      components: {
        default: GoodsList,
        title: Title,
        img: Image
      },
      //嵌套路由 子路由
      children: [
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'img',
          name: 'img',
          component: Image
        }
      ]
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: Cart
    }
  ]
})
