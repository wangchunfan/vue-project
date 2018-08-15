<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <!--插槽-->
        <slot></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "nav-bread"
    }
</script>

<style scoped>

</style>
