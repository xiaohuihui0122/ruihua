<template>
  <div class="page page-privilege tab-health-pack-introduce">
    <section class="pack-service-content">
      <div class="golden-service-title"><div>服务内容</div></div>
      <div class="golden-container mg-lg">
        <div class="container-label"><div>Service Content</div></div>
        <div class="pd-lg">
          <div class="grey-row">健康管家服务卡</div>
          <div class="service-list">
            <div class="service-item">
              <img src="../../../../assets/img/privilege/icon_dot.png">
              电话医生
            </div>
            <div class="service-item">
              <img src="../../../../assets/img/privilege/icon_dot.png">
              专家诊疗
            </div>
            <div class="service-item">
              <img src="../../../../assets/img/privilege/icon_dot.png">
              住院手术安排
            </div>
            <div class="service-item">
              <!-- 为了排版，保持双数 -->
            </div>
          </div>
        </div>
        <div class="pd-lg">
          <div class="grey-row">癌无忧防癌险</div>
          <div class="content-row">18-40周岁，保障期限1年，保额10万元</div>
          <div class="content-row">41-60周岁，保障期限1年，保额5万元</div>
        </div>
      </div>
    </section>
    <section-famous-hospital></section-famous-hospital>

    <privilege-dialog-no-card :show.sync="showDialog1"></privilege-dialog-no-card>

    <privilege-dialog-inactive :show.sync="showDialog2"></privilege-dialog-inactive>

    <mu-raised-button 
      v-if="status>=0 && status<=3"
      class="button-privilege" 
      label="立即领取"
      @click="preTakePack"
      :style="{backgroundImage: 'url('+buttonImage+')'}">
    </mu-raised-button>
    <mu-dialog dialogClass="dialog packs-to-take-dialog" :open="dialog" @close="dialog=false">
      <div class="dialog-content">
        <div class="packs-to-take-dialog-title">领取健康管家服务套餐</div>
        <div class="packs-to-take-dialog-description">您是否确认领取该套餐，领取后将不可更改</div>
      </div>
      <div class="buttons">
        <mu-flat-button slot="actions" class="action-button" @click="dialog=false" label="取消"/>
        <mu-flat-button slot="actions" class="action-button" @click="takePack" label="确定"/>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import store from '../../../../vuex/store'
import SectionFamousHospital from './SectionFamousHospital'
import PrivilegeDialogNoCard from './PrivilegeDialogNoCard'
import PrivilegeDialogInactive from './PrivilegeDialogInactive'
export default {
  name: 'TabHealthPackIntroduce',
  components: {
    SectionFamousHospital,
    PrivilegeDialogNoCard,
    PrivilegeDialogInactive,
  },
  filters: {

  },
  props: {

  },
  data() {
    return {
      status:null,
      dialog: false,
      showDialog1:false,
      showDialog2:false,
      buttonImage: require('../../../../assets/img/privilege/button.png'),
    }
  },
  computed: {

  },
  watch: {
  
  },
  mounted() {
    this.status = this.$store.state.privilege.privilegeStatus
  },
  methods: {
    preTakePack() {
      if(this.status == 0) {
        this.$router.replace('temporaryAuth')
      }else if(this.status == 1){
        this.showDialog1 = true
      }else if(this.status == 2){
        this.showDialog2 = true
      }else if(this.status == 3){
        this.dialog=true
      }
    },
    takePack() {
      this.dialog=false
      let model = {
        cardId: 'BCM0001',
        //openId: 'oM9JHwQDXbqlMrMNgKpahUNIcvAUB',
        openId: utils.cache.get('wxConfig').openId,
        activityId:'ac2017090801',
        packageId:'ncp2017090802',
      }
      utils.http.post('RECEIVEPROFITLIST', model).then(response => {
        console.log('RECEIVEPROFITLIST.response.data', response.data)
                  utils.ui.toast('领取成功')
          this.$emit('takePackSuccess',this.type)
        if(response.data.body){
          //领取成功
          utils.ui.toast('领取成功')
          this.taken = true
        }else{
          //领取失败
          utils.ui.toast('领取失败')
        }
      }).catch(error => {
        utils.ui.toast(error.errorMessage)
      })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/privilege';
.page-privilege.tab-health-pack-introduce{
  background: white;
  .button-privilege {
    margin-top:0px;
  }
}
</style>