<template>
  <div class="top">
    <layHead></layHead>
    <tabs></tabs>
    <goodsList v-if="tabIndex === 0"></goodsList>
    <comments v-if="tabIndex === 1"></comments>
    <shop v-if="tabIndex === 2"></shop>
    <cbottom></cbottom>
  </div>
  
</template>

<script>
import tabs from '@/components/tabs'
import layHead from '@/components/layHead'
import goodsList from '@/components/goodsList'
import comments from '@/components/comments'
import shop from '@/components/shop'
import cbottom from '@/components/cbottom'
export default {
  data() {
    return {
      logImgUrl: '',
      shopname: '',
      shop_notice: '',
      tabIndex: 0
    };
  },

  components: {
    tabs,
    layHead,
    goodsList,
    comments,
    shop,
    cbottom
  },
  mounted () {
    // console.log(this.tabIndex);
    this.$eventHub.$on('tabChange', res => {
    //  console.log(res);
    this.tabIndex = res;
     
    });
    
    this.$apis.getfood().then((res)=>{
      // console.log(res);
      this.logImgUrl = res.data.image;
      this.shopname = res.data.shopname;
      this.shop_notice = res.data.shop_notice;
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
