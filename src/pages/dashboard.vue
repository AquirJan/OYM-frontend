<template>
  <div>
    <router-link :to="{name:'designer',query:{designId:1}}">已有网站</router-link>
    <router-link :to="{name:'designer'}">新开网站</router-link>
  </div>
</template>
<style scoped>
  .item{
    border:1px solid #345;
    height:40px;
  }
  .group .item{
    background:#cdd;
  }
</style>
<script>
  
  export default {
    data(){
      return{
      }
    },
    components:{
      
    },
    methods:{
      
    }
  }
</script>
