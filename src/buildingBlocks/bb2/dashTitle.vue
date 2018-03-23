<template>
  <div class="dash-title">
    <span class="title">
      <slot></slot>
    </span>
    <div class="line"></div>
  </div>
</template>
<style scoped>
  .dash-title{
    position:relative;
  }
  .title{
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 0 4rem 0 1rem;
  }
  .line{
    position:absolute;
    top:50%;
    width:100%;
    left:0;
    z-index: 1;
    border-top: 1px solid rgb(233, 242, 251);
    border-bottom: 1px solid #f3f3f3;
  }
</style>
<script>
  export default {
    name:'dashTitle',
    
  }
</script>