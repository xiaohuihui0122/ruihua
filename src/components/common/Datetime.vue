<template>
  <div class="com-date-time">
    <mu-text-field class="com-date-time-input" ref="datetime" :label="label" v-model="inputValue" labelFloat/>  
    <img v-if="icon" src="../../assets/img/icon_date.png"/>
  </div>
</template>

<script>
  let ms = require('../../assets/lib/mobiscroll/js/mobiscroll.javascript.min.js')
  import '../../assets/lib/mobiscroll/css/mobiscroll.javascript.min.css'

  export default {
    name: 'datetime',
    //icon:是否与图片；maxDate:日期选择最大值；minDate:日期选择最小值；isBirthday:是否是选择生日；hintText:默认提示
    props: ['label', 'value','icon','maxDate','minDate','isBirthday','hintText'],
    data() {
      return {
        inputValue: this.value
      }
    },
    methods: {
      
    },
    watch: {
      value (val) {
        this.inputValue = val
      },
      inputValue (val) {
        this.$emit('input', val)
      }
    },
    mounted () {
      if(!window.mobiscroll){
        window.mobiscroll = ms.mobiscroll
      }
      let input = this.$refs.datetime.$el.getElementsByTagName('input')[0]
      let id = 'datetime_' + ((''+Math.random()).substr(2))
      input.setAttribute('id', id)
      //设置默认提示
      document.getElementById(id).placeholder = this.hintText;
      let options = {
        theme: 'ios',
        display: 'bottom',
        dateFormat: 'yy-mm-dd',
        lang: 'zh',
        yearSuffix: '年',
        monthSuffix: '月',
        daySuffix: '日',
        // max: this.isBirthday ? (new Date()) : this.maxDate ? (new Date(this.maxDate)) : null,
        // min: this.minDate ? (new Date(this.minDate)) : null,
        onSet: (value, inst) => {
          this.inputValue = value.valueText
          this.$emit('input', value.valueText)
          this.$emit('update', value.valueText)
        }
      }
      let max = this.isBirthday ? (new Date()) : this.maxDate ? (new Date(this.maxDate)) : null;
      let min = this.minDate ? (new Date(this.minDate)) : null
      if(max != null){
        options.max = max
      }
      if(min != null){
        options.min = min
      }

      mobiscroll.date('#' + id, options)
    }
  }
</script>
<style lang="scss" scoped>
  .com-date-time{
    position:relative;
  }
  .com-date-time img{
    width: 22px;
    height: auto;
    position: absolute;
    right: 10px;
    top: 8px;
    z-index: 1;
  }
  .com-date-time-input{
    z-index: 999;
  }
</style>
