<template>
    <div class="header">
      <div class="mask-block"></div>
      <div class="logo_bg"></div>
      <div class="topBox">
        <div class="f-block-1">
          <div class="logo">
            <img :src="logImgUrl" alt="">
          </div>
          <div class="content">
            <p class="shopname">{{shopname}}</p>
            <div class="tips"><span class="iconfont .icon-gonggao"></span>{{shop_notice}}</div>
          </div>
          <div class="save">
            <p class="love"><i-icon type="like"  size="21" color="#fff" /></p>
            <p class="text">收藏</p>
          </div>
        </div>
        <div class="f-block-2"></div>
      </div>
    </div>
</template>

<script>
import '@/iconfont/iconfont.wxss'
import './css/layHead.scss'
export default {
  data() {
    return {
      logImgUrl: '',
      shopname: '',
      shop_notice: ''
    };
  },
  
  mounted(){
    this.$apis.getfood().then((res)=>{
      this.logImgUrl = res.data.image;
      this.shopname = res.data.shopname;
      this.shop_notice = res.data.shop_notice;
    })
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
