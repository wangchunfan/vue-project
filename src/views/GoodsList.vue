<template>
  <div>
    这是商品列表页面

    <!--动态路由，获取路由中的数据-->
    <!--<p>{{$route.params.goosdId}}</p>-->
    <!--<p>{{$route.params.userName}}</p>-->

    <!--嵌套路由子路由-->
    <div>
      <router-link to="/goods/title">显示商品标题</router-link>
      <router-link to="/goods/img">显示商品图片</router-link>
      <!--在页面中渲染的位置-->
      <router-view></router-view>
    </div>
    <hr/>
    <!--编程式路由-->
    <div>
      <router-link to="/cart">跳转到购物车</router-link>
      <li><button @click="jumpStr">跳转到购物车页面（字符串）</button></li>
      <li><button @click="jumpObj">跳转到购物车页面（对象）</button></li>
      <li><button @click="jumpQue">跳转到购物车页面（传参）</button></li>
      <li><button @click="jumpGo">前进</button></li>
      <li><button @click="jumpBack">后退</button></li>
    </div>
    <hr/>
    <!--命名路由和命名视图-->
    <div>
      <router-link v-bind:to="{ name:'cart',params:{cardId:321} }">跳转到购物车页面（命名路由）</router-link>
    </div>
    <hr>


  </div>
</template>

<script>
    export default {
        methods:{
          jumpStr(){
            this.$router.push('/cart')
          },
          jumpObj(){
            this.$router.push({path:'cart'})
          },
          jumpQue(){
            this.$router.push({path:'cart',query:{goodsId:123}})
          },
          jumpGo(){
            this.$router.go(1)
          },
          jumpBack(){
            this.$router.go(-1)
          }
        }
    }
</script>

<style scoped>

</style>
