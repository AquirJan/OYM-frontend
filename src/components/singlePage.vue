<template>
  <div>
    <draggable v-if="value&&value.length>0" v-model="value" :options="spcDraggableOpts" @start="drag=true" @end="drag=false">
      <div v-for="item in value" :key="item.id">{{item.name}}</div>
    </draggable>
    <div class="cntr-flex aligni-center justify-center full-height" v-else>
      <div >没有组件</div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'singlePage',
  props:{
    value:{
      type:Object,
      default:null,
    }
  },
  data(){
    return {
      
    }
  },
  components:{
    draggable,
  }
}
</script>

<style scoped>
</style>
