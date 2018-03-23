<template>
  <div class="transit-all" :class="calWdbWrapClass" :style="wdbStyle">
    <div class="wdc-content full-height cntr-flex aligni-stretch" v-show="bblStatus">
      <div v-if="placement=='right'" class="bbl-mask " :class="calOffsetSize" @click.stop.prevent="changeBBLStatus($event)"></div>
      <div class="flex-full bbl-body" >
        <!-- 积木库候选容器 building blocks library wrap -->
        <slot name="content"></slot>
        <!-- end -->
      </div>
      <div v-if="placement=='left'" class="bbl-mask " :class="calOffsetSize" @click.stop.prevent="changeBBLStatus($event)"></div>
    </div>    
    <span v-show="!bblStatus" class="pin-absolute cursor-pointer cntr-mb-m" :class="calculatePinClass" @click.stop.prevent="changeBBLStatus($event)">
      <slot name="icon"></slot>
    </span>
  </div>
</template>
<style scoped>
.pin-absolute{
    position:absolute;
  }
  .pin-lb{
    left:0;
    bottom:0;
  }
  .pin-lt{
    left:0;
    top:0;
  }
  .pin-rb{
    right:0;
    bottom:0;
  }
  .pin-rt{
    right:0;
    top:0;
  }
  .wdb-pin-left{
    font-size:2.5rem;
    line-height:1;
    z-index:2;
    left:101%;
    bottom:0;
  }
  .wdb-pin-right{
    font-size:2.5rem;
    line-height:1;
    z-index:2;
    right:101%;
    bottom:0;
  }
  .wdb-wrap-left{
    position:absolute;
    /* top:0; */
    left:0;
    width:100%;
    bottom:0;
    transform: translate(-100%, 0);
    z-index: 2;
  }
  .wdb-wrap-right{
    position:absolute;
    /* top:0; */
    left:0;
    width:100%;
    bottom:0;
    transform: translate(100%, 0);
    z-index: 2;
  }
  .bbl-mask{
    /* background-color:rgba(0,0,3,.4); */
    background-color:rgba(255,255,255,.7);
    /* transition:all 600ms; */
  }
  .bbl-mask.on{
    background-color:rgba(0,0,3,.4);
  }
  .bbl-body{
    background-color:#fff;
    box-shadow:0 0 10px #333;
  }
  .bbl-footer{
    border-top:1px solid #efefef;
  }
  .bbl-search{
    max-width:300px;
  }
</style>
<script>
  const onlyNumber = /\d/gi;
  export default {
    name:'slideDrawer',
    props:{
      offsetSize:{
        type:Number,
        default:2,
      },
      offsetTop:{
        type:Number,
        default:0,
      },
      placement:{
        type:String,
        default:'left',
      }
    },
    data(){
      return {
        wdbStyle:{},
        bblStatus:false,
        initZIndex:2,
      }
    },
    computed:{
      calculatePinClass(){
        if(this.placement == 'left'){
          return 'wdb-pin-left cntr-mr-m'
        }else{
          return 'wdb-pin-right cntr-ml-m'
        }
      },
      calWdbWrapClass(){
        if(this.placement == 'left'){
          return 'wdb-wrap-left'
        }else{
          return 'wdb-wrap-right'
        }
      },
      calOffsetSize(){
        let tmp_size = 'col-2';
        if(this.offsetSize.toString().match(onlyNumber)){
          tmp_size = `col-${this.offsetSize}`
        }
        return tmp_size;
        // if(this.bblStatus){
        //   return `${tmp_size} on`
        // }else{
        //   return tmp_size
        // }
      },
    },
    methods:{
      uiInit(){
        this.wdbStyle = {'top':this.offsetTop+'px'}
      },
      changeBBLStatus($event){
        let tmp_translate = 'translate(0, 0)';
        if(this.bblStatus){
          // 关闭
          this.bblStatus = false;
          this.initZIndex = 2;
          if(this.placement == 'left'){
            tmp_translate = 'translate(-100%, 0)';
          }else{
            tmp_translate = 'translate(100%, 0)';
          }
        }else{
          // 开启
          this.bblStatus = true;
          this.initZIndex = 3;
          // if(this.placement == 'left'){
          //   tmp_translate = 'translate(0, 0)';
          // }else{
          //   tmp_translate = 'translate(0, 0)';
          // }
        }
        this.wdbStyle = {
          'top':this.offsetTop+'px',
          'transform':tmp_translate,
          'z-index':this.initZIndex,
        }
        
      },
    },
    mounted(){
      // console.log(this.offsetSize)
      this.uiInit();
      
    }
  }
</script>