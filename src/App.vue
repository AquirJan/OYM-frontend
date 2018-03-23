<template>
  <div id="app" class="lock-select">
    <div ref="rootView" :style="rootViewStyle">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data(){
    return {
      rootViewStyle:{}
    }
  },
  mounted(){
    setTimeout(()=>{
      if(window.innerHeight>this.$refs.rootView.getBoundingClientRect().height){
        this.rootViewStyle = {
          height:window.innerHeight+'px'
        }
      }
    })
  }
}
</script>

<style>
  @import './assets/styles/common.css';
  @import './assets/styles/style.css';
  #app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width:1280px;
    margin:0 auto;
    overflow:hidden;
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vertical-center-modal>.ivu-modal{
    top: 0;
  }
</style>
