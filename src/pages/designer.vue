<template>
  <div class="cntr-flex full-height flex-column aligni-stretch">
    <!-- top bar -->
    <div class="top-bar-wrap transit-all bg-l-blue" :style="topBarStyle" ref="refTopBar">
      <div class="top-bar cntr-p cntr-flex aligni-center justify-between" >
        <!-- 左侧功能 -->
        <div class="">
          <div class="cntr-flex aligni-center">
            <div>
              <!-- 用户头像 -->
              <Dropdown placement="bottom-start" trigger="click">
                <Badge >
                  <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" ></Avatar>
                </Badge>
                <DropdownMenu slot="list">
                  <DropdownItem>{{$t('info11')}}</DropdownItem>
                  <DropdownItem>{{$t('info12')}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="cntr-pl-sm cntr-pl-sm cntr-relative" @mouseover.stop="showPNSettingPencil=true" @mouseout.stop="showPNSettingPencil=false" >
              <!-- 网站名，备注信息 -->
              <div class="pn-edit-icon-wrap text-right cursor-pointer" v-if="showPNSettingPencil" >
                <Tooltip :content="$t('info16')" placement="right" :delay="500">
                  <Icon type="edit" class="font-size-rm" @click.native.stop.prevent="openEditPNSetting($event)"></Icon>
                </Tooltip>
              </div>
              <h4>{{projectData.projectName}}</h4>
              <p class="font-size-rsm">{{projectData.remarks}}</p>
              <p class="font-size-rsm">{{projectData.domain}}</p>
            </div>
          </div>
        </div>
        <!-- 右侧功能 -->
        <div class="">
          <div class="top-bar-addon cntr-flex aligni-center justify-between">
            <Tooltip :content="$t('info13')" placement="bottom">
              <Icon type="ios-box-outline" class="font-size-rxxxlg"></Icon>
            </Tooltip>
            <Tooltip :content="$t('info14')" placement="bottom">
              <Icon type="ios-cloud-upload-outline" class="font-size-rxxxlg"></Icon>
            </Tooltip>
            <Tooltip :content="$t('info15')" placement="bottom">
              <Icon type="ios-monitor-outline" class="font-size-rxxxlg"></Icon>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- single page canvas -->
    <div class="single-page-canvas flex-full scroll-y cntr-relative">
      <!-- <draggable v-if="projectData.spcData&&projectData.spcData.length>0" v-model="projectData.spcData" :options="spcDraggableOpts" @start="drag=true" @end="drag=false">
        <div v-for="item in projectData.spcData" :key="item.id">{{element.name}}</div>
      </draggable>
      <div class="cntr-flex aligni-center justify-center full-height" v-else>
        <div @click="ttalert">没有组件</div>
      </div> -->
      <singlePage v-model="projectData.spcData" ></singlePage>
    </div>
    <!-- web design building blocks -->
    <!-- <div class="wdb-wrap transit-all" :style="wdbStyle">
      <div class="wdc-content full-height cntr-flex aligni-stretch" v-if="bblStatus">
        
        <div class="flex-full bbl-body" >
        </div>
        <div class="bbl-r-mask col-2" @click="changeBBLStatus($event)"></div>
      </div>
      <span v-else class="pin-absolute pin-lb wdb-pin cntr-mr-m cntr-mb-m cursor-pointer">
        <Tooltip :content="$t('info17')" placement="right" >
          <Icon type="ios-cart-outline" @click.native.stop.prevent="changeBBLStatus($event)" ></Icon>
        </Tooltip>
      </span>
    </div> -->
    <!-- 左侧积木组件库 -->
    <slideDrawer placement="left" :offsetTop="topBarHeight">
      <template slot="content">
        <div class="cntr-flex full-height flex-column">
          <!-- bbl body -->
          <div class="flex-full scroll-y bg-efefef">
            <div class="cntr-flex flex-wrap">
              <bblItem :data="item" v-for="item in mockData.bblList" ></bblItem>
            </div>
          </div>
          <!-- bbl footer -->
          <div class="bbl-footer cntr-p-sm">
            <div class="cntr-flex justify-between aligni-center">
              <div class='flex-full'>
                <Page :current="2" :total="50" simple></Page>
              </div>
              <div class='flex-full cntr-pr-m text-right'>
                <iInput class="bbl-search" v-model="bblSearch" icon="search" :placeholder="$t('info18')" ></iInput>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="icon">
        <Tooltip :content="$t('info17')" placement="right" >
          <Icon type="ios-cart-outline"  ></Icon>
        </Tooltip>
      </template>
    </slideDrawer>
    <!-- 右则单页管理 -->
    <slideDrawer placement="right" :offsetSize="7"  :offsetTop="topBarHeight">
      <template slot="content">
        <div class="cntr-flex full-height flex-column">
          <ul>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </template>
      <template slot="icon">
        <Tooltip :content="$t('info17')" placement="left" >
          <Icon type="clipboard"  ></Icon>
        </Tooltip>
      </template>
    </slideDrawer>
    <!-- web setting modal -->
    <Modal :mask-closable="false" :closable="canSPNMClose" class-name="vertical-center-modal" v-model="settingModalStatus" :title="$t('info0')" >
      <Form ref="settingForm" :model="settingData" :rules="settingFormRules" >
        <Steps :current="settingCurrentStep" class="cntr-mb-m">
          <Step :title="$t('info4')" @click.native.stop="settingStepChange($event, 0)"></Step>
          <Step :title="$t('info10')" @click.native.stop="settingStepChange($event, 1)"></Step>
          <Step :title="$t('info5')" @click.native.stop="settingStepChange($event, 2)"></Step>
        </Steps>
        <div v-show="settingCurrentStep==0">
          <FormItem prop="projectName">
            <iInput v-if="isEmptyObject(projectData)" @keydown.native.enter.stop.prevent="checkProjectName" :disabled="requestPNUniqueIng" :placeholder="$t('info7')+'，'+$t('info3')" v-model.trim="settingData.projectName" :icon="calculatePNIcon" @on-click="checkProjectName"></iInput>
            <p v-else><strong>{{projectData.projectName}}</strong></p>
          </FormItem>
        </div>
        <div v-show="settingCurrentStep==1">
          <FormItem prop="remarks">
            <iInput @keydown.native.enter.stop.prevent="nextStep" :placeholder="$t('info6')" v-model.trim="settingData.remarks" icon="android-arrow-forward" @on-click="nextStep"></iInput>
          </FormItem>
        </div>
        <div v-show="settingCurrentStep==2">
          <FormItem prop="domain">
            <iInput :placeholder="$t('info6')" v-model.trim="settingData.domain" :icon="calcualtePIcon" @on-click="accomplishProject"></iInput>
          </FormItem>
        </div>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<style scoped>
  .top-bar-wrap{
    z-index:10;
  }
  .top-bar{
    border-bottom:1px solid #c7c7c7;
  }
  .pn-edit-icon-wrap{
    position:absolute;
    top:0;
    right:0;
    width:20px;
    height:20px;
    z-index:2;
    
    border-radius:4px;
  }
  .pn-edit-icon-wrap::before{
    display:block;
    /* content:''; */
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:red;
    border-radius:4px;
    z-index:-1;
    transform:rotate(-45deg) translate(54%, 0);
  }
  .top-bar-addon{
    width:100px;
  }
  /* .pin-absolute{
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
  .wdb-pin{
    font-size:2.5rem;
    line-height:1;
    z-index:2;
    left:101%;
    bottom:0;
  }
  .wdb-wrap{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    bottom:0;
    transform: translate(-100%, 0);
    z-index: 2;
  } */
  /* .bbl-r-mask{
    background-color:rgba(0,0,3,.4);
  } */
  /* .bbl-mask{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:1;
    background-color:rgba(0,0,3,.4);
  } */
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
<style>
  .ivu-page-simple .ivu-page-next, 
  .ivu-page-simple .ivu-page-prev{
    margin-top:-4px;
    height:23px;
    line-height:23px;
  }
  .ivu-page-simple .ivu-page-next{
    margin-top:-2px;
  }
</style>
<script>
  import Vue from 'vue';
  import draggable from 'vuedraggable';
  import { projectNameReg, isEmptyObject } from '../util.js';

  import dashTitle from '../buildingBlocks/bb2';
  import slideDrawer from '../buildingBlocks/bb3';
  import bblItem from "../components/bblItem.vue";
  import singlePage from '../components/singlePage.vue';
  function getImageUrl(_bbname, _type){
    return `http://ajhk.dokodm.com/buildingBlocks/${_bbname}/${_type}`
  };
  const mockData = {
    bblList:[
      {
        selected:false, // 该字段后台可以不保存
        price:0.8,
        compatibility:'ie',
        snapshot:getImageUrl('bb1','snapshot.png'),
        dynamicEffect:getImageUrl('bb1','dynamicEffect.png'),
        devCode:'bb1',
        slogan:'recommend',
      },
      {
        selected:false,
        price:0.8,
        compatibility:'ie',
        snapshot:getImageUrl('bb2','snapshot.png'),
        dynamicEffect:getImageUrl('bb2','dynamicEffect.png'),
        devCode:'bb2',
        slogan:'promote',
      }
    ]
  }
  export default {
    data(){
      return{
        mockData: mockData, //模拟数据 data scheme

        preview:false,
        topBarStyle:{},
        canSPNMClose:false,
        showPNSettingPencil:false,
        topBarHeight:0,
        settingCurrentStep:0,
        settingModalStatus:false,
        accomplishProjectStatus:false,
        settingData:{
          projectName:'project0', //fake data;
          remarks:'project0 remarks'
        },
        isEmptyObject:isEmptyObject,
        requestPNUniqueIng:false,
        settingFormRules:{
          projectName:[
            { trigger: 'blur' },
          ]
        },
        
        projectData:{},
        spcDraggableOpts:{
          group:'spc',
          draggable:'.drag-handler'
        },

        // building blocks library
        bblStatus:false,
        wdbStyle:{},
        bblSearch:'',
        
      }
    },
    components:{
      draggable,
      dashTitle,
      bblItem,
      singlePage,
      slideDrawer,
    },
    watch:{
      // projectData:function(_nv, _ov){
      //   console.dir(_nv)
      // }
    },
    computed:{
      // calculateTBStyle(){
      //   if(this.preview){
      //     this.topBarStyle = {'height':0};
      //   }else{
      //     this.topBarStyle = this.topBarHeight===0?{'height':this.topBarHeight+'px'}:{'height':'65px'};
      //   }
      // },
      calculatePNIcon(){
        if(!this.requestPNUniqueIng){
          return 'android-arrow-forward'
        }else{
          return 'load-c spinning'
        }
      },
      calcualtePIcon(){
        if(!this.accomplishProjectStatus){
          return 'android-arrow-forward'
        }else{
          return 'load-c spinning'
        }
      }
    },
    methods:{
      // ttalert(){
      //   alert(1)
      // },
      // changeBBLStatus($event){
      //   console.log('changeBBLStatus')
      //   if(this.bblStatus){
      //     this.bblStatus = false;
      //     this.wdbStyle = {
      //       'top':this.topBarHeight+'px',
      //       'transform':'translate(-100%, 0)',
      //     }
      //   }else{
      //     this.bblStatus = true;
      //     this.wdbStyle = {
      //       'top':this.topBarHeight+'px',
      //       'transform':'translate(0, 0)',
      //     }
      //   }
        
      // },
      settingStepChange($event, _index){
        this.settingCurrentStep = _index;
      },
      openEditPNSetting($event){
        this.showSPNM();
      },
      nextStep($event){
        this.settingCurrentStep = this.settingCurrentStep+1;
      },
      validatePN(rule, value, callback){
        if (value === '') {
          callback(new Error(' '));
        } else if (value!==''&&!value.match(projectNameReg)) {
          callback(new Error(this.$t('info8')));
        } else {
          callback();
        }
      },
      checkProjectName(){
        // 请求接口，判断工程名（网站名）在同账号下是否已存在
        this.requestPNUniqueIng = true;
        
        setTimeout(()=>{
          if(this.settingData.projectName===''){
            this.$Notice.error({
              title: this.$t('info2')
            });
            this.requestPNUniqueIng = false;
          }else if(this.settingData.projectName.match(projectNameReg)){
            this.requestPNUniqueIng = false;
            this.$Modal.confirm({
              title: '',
              width:280,
              content: `<p>${this.$t("info9")}</p>`,
              onOk: () => {
                this.settingCurrentStep = 1;
              }
            });
          }else{
            this.$Notice.error({
              title: this.$t('info1')
            });
            this.requestPNUniqueIng = false;
          }
        })
      },
      accomplishProject(){
        // 完成工程设定
        this.accomplishProjectStatus = true;
        // setTimeout(()=>{
          this.accomplishProjectStatus = false;
          this.settingModalStatus = false;

          this.projectData['projectName'] = this.settingData.projectName;
          this.projectData['remarks'] = this.settingData.remarks;
          this.projectData['domain'] = this.settingData.domain;
          this.projectData['status'] = 'draft';
          this.projectData['type'] = 'static';
        // },2000)
        this.uiInit()
      },
      showSPNM(){
        this.settingModalStatus = true;
        if(this.projectData && this.projectData.status === 'draft'){
          this.canSPNMClose = true;
        }else{
          this.canSPNMClose = false;
        }
      },
      uiInit(){
        setTimeout(()=>{
          if(this.$refs.refTopBar){
            this.topBarHeight = this.$refs.refTopBar.getBoundingClientRect().height;
            this.wdbStyle = Object.assign(this.wdbStyle, {'top':this.topBarHeight+'px'});
          }
        })
      }
    },
    mounted(){
      this.$set(this.settingFormRules.projectName,'validator',this.validatePN);
      this.settingFormRules = {
        projectName:[
          { validator:this.validatePN, trigger: 'change,blur' },
        ]
      }
      
      if(!this.$route.query.designId){
        this.showSPNM();
      }else{
        // mock data
        this.projectData = JSON.parse(JSON.stringify(this.settingData));
        this.projectData['status'] = 'draft';
        this.projectData['type'] = 'static';
        
      }

      this.uiInit();
      
      
    }
  }
</script>
