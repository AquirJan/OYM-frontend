<template>
  <div class="bbl-item-wrap cntr-p-m" @click="selectedAction" >
    <Card v-if="!noData" class="bbl-item-content over-hidden cntr-relative " :class="{'selected':schemeData.selected}"  ref="refBblItem" :bordered="false">
      <div class="bbl-item-snapshot transit-all" :style="funSnapShot(schemeData.snapshot)"></div>
      <div class="bbl-item-scale cntr-tooltip lock-select font-size-rxsm" @click="openDEMoal">
        GIF
      </div>
      <div class="bbl-item-slogan font-size-rxsm ">
        {{schemeData.slogan}}
      </div>
      <div class="bbl-item-price font-size-rxsm ">
        {{schemeData.price}}&nbsp;{{$t('info19')}}/{{$t('info20')}}
      </div>
    </Card>
    <Modal width="1000" v-model="showScale" class-name="vertical-center-modal">
      <img :src="schemeData.dynamicEffect" class="full-width"/>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'bblItem',
  props:{
    data:{
      type:Object,
      default:null,
      required:true,
    },
  },
  watch:{
    data:function(_nv, _ov){
      this.dataInit(_nv)
    },
  },
  data(){
    return {
      schemeData:{},
      showScale:false,
      noData:false,
    }
  },
  methods:{
    dataInit(_data){
      let tmp_data = JSON.stringify(_data);
      if(tmp_data === '{}'){
        this.noData = true;
      }else{
        this.noData = false;
        this.schemeData = JSON.parse(tmp_data);
      }
    },
    funSnapShot(_src){
      return {'background-image':`url(${_src})`}
    },
    openDEMoal(){
      this.showScale = true;
    },
    selectedAction(){
      if(this.schemeData.selected === true){
        this.schemeData.selected = false;
      }else{
        this.schemeData['selected'] = true;
      }
      this.$emit('change', {
        data:this.schemeData
      })
    }
  },
  mounted(){
    this.dataInit(this.data)
  }
}
</script>

<style scoped>
  .bbl-item-snapshot{
    background-repeat:no-repeat;
    background-size:contain;
    background-position:center;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1;
    transform-origin: center;
    transform:scale(1);
  }
  .bbl-item-content{
    border:2px solid transparent;
    /* box-shadow:none; */
    opacity:.5;
  }
  .bbl-item-content:hover{
    opacity:1;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
  .bbl-item-content:hover .bbl-item-snapshot{
    transform:scale(.95);
  }
  .bbl-item-content{
    width:200px;
    height:200px;
  }
  .bbl-item-slogan{
    
    display:block;
    padding:4px;
    border-bottom-right-radius: 4px;
    /* width:60px;
    height:60px; */
    /* margin:-30px 0 0 -30px; */
    /* transform:rotate(45deg); */
    position:absolute;
    top:0;
    left:0;
    z-index:2;
    background:rgb(219, 235, 255);
    transform-origin:center;
    
  }
  .bbl-item-scale{
    position:absolute;
    top:2%;
    right:2%;
    z-index:2;
  }
  .bbl-item-price{
    display:block;
    padding:4px;
    border-top-left-radius: 4px;
    position:absolute;
    bottom:0;
    right:0;
    z-index:2;
    background:rgb(219, 235, 255);
    transform-origin:center;
  }
  .bbl-item-content.selected{
    border:2px solid #96acff;
    box-shadow: 0 0 10px #96acff;
    opacity:1;
  }
</style>
