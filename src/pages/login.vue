<template>
  <div class="sim-table">
    <div class="sim-table-cell">
      <Card class="login-wrap">
        <h2 class="cntr-mb-m text-left">O.Y.M.</h2>
        <div class="cntr-mb-m">
          <iInput placeholder="name"></iInput>
        </div>
        <div>
          <iInput placeholder="password" type="password"></iInput>
        </div>
        <div class="text-right cntr-pt-m">
          <Button @click="goLogin">go</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
<style scoped>
  .login-wrap{
    width: 70%;
    margin:0 auto;
    max-width:320px;
  }
</style>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      goLogin(){
        this.$router.push({
          name:'dashboard'
        })
      }
    }
  }
</script>
