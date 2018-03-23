<template>
  <div>
    <dashTitle>hello</dashTitle>
    <div class="cntr-flex flex-wrap">
      <bblItem :data="bblItemScheme" ></bblItem>  
      <bblItem :data="bblItemScheme" ></bblItem>  
      <bblItem :data="bblItemScheme" ></bblItem>  
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import dashTitle from "../buildingBlocks/bb2"
  import bblItem from "../components/bblItem.vue";
  export default {
    components:{
      dashTitle,
      bblItem,
    },
    data(){
      return {
        bblItemScheme:{
          selected:false,
          price:0.8,
          compatibility:'ie',
          snapshot:'https://i.loli.net/2017/08/21/599a521472424.jpg',
          dynamicEffect:'https://i.loli.net/2017/08/21/599a521472424.jpg',
          devCode:'bb1',
          slogan:'recommend',
        }
      }
    }
  }
</script>