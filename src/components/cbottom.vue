<template>
  <div class="til">
    <div class="til-rel">
      <div class="gwc"><img src="../../static/images/cart.png" alt=""></div>
      <div class="countpri">
        <p>总价:￥{{$store.state.count}}</p>
      </div>
      <div class="song" style="color:red;font-weight:900；background:#fff;">购买</div>
          <!-- <div class="song">{{'￥'+infoList.basicprice}}元起送</div> -->
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // num:0
      count: 0
    }
  },
  computed:{
    count(){
      this.count = this.$store.state.count;
    }
  },
  mounted(){
    // console.log(this.$store.state.count)
    // this.num=
  }
}
</script>

<style  lang="scss" scoped>
.til {
    height: 45px;
    z-index: 50;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #141d27;
    .til-rel {
      line-height: 45px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      display: flex;
      .gwc{
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 7px;
        margin-left:  40px;
        >img{
          width: 100%;
          height: 100%;
        }
      }
      .countpri{
        text-align: left;
        margin-left: 10px;
        width:195px;
      }
      .song{
        background: #eee;
        width: 100px;
        color: #999;
      }
    }
}

</style>
