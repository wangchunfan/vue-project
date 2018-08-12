<template>
    <div>
    	这是购物车页面
    	<p>传参：{{$route.query.goodsId}}</p>
      <p>动态路由参数：{{$route.params.cardId}}</p>
    </div>

</template>

<script>
    export default {
        name: "cart"
    }
</script>

<style scoped>

</style>
