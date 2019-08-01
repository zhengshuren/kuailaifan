<template>
  <div class="contents">
    <scroll-view scroll-y class="left">
      <ul>
        <li class="search">
          <i-icon type="search"  size="30" color="#676767" />
        </li>
        <li v-for="(item, index) in foodtype" :key="index" :class="active === index ? 'active' : ''" @click="tabs(index)">
          {{item.name}}
        </li>
      </ul>
    </scroll-view>
    <scroll-view scroll-y :scroll-into-view="scrollId" scroll-with-animation @scroll="scroll" @scrolltolower="scrolltolower">
      <div class="right">
        <div class="type" v-for="(item, index) in goodInfo" :key="index">
          <h1 :id="'po'+index" class="titlerh">{{item.typeName}}</h1>
          <div class="goods" v-for="(detail, num) in item.foodList" :key="num">
            <img :src="detail.img" alt="" />
            <div class="goodInfo">
              <p class="name">{{detail.name}}</p>
              <p class="descript">{{detail.descript}}</p>
              <p class="price">
                ￥{{detail.price}}
                <span style="font-size:10px;color:#A9A9A9;" v-if="detail.unit">
                  /{{detail.unit}}
                </span>
                <span class="formerprice" v-if="detail.formerprice > detail.price">￥{{detail.formerprice}}</span>
              </p>
              <div class="addcarts">
                <span class="add" @click="add(detail)">+</span>
                <span class="num">{{detail.number}}</span>
                <span class="del" @click="del(detail)">-</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!-- <i-button type="primary">这是一个按钮</i-button> -->
  </div>
</template>

<script>
import '@/iconfont/iconfont.wxss'
import './css/goodsList.scss'
export default {
  data() {
    return {
      goodInfo: [],
      foodtype: [],
      scrollId: '',
      active: 0,
      // 右侧listTop
      listHeight: [],
      // scroll
      scrollTop: 0,
    };
  },

  mounted(){
    wx.showLoading({
    });
    this.$apis.getfood().then((res)=>{
      wx.hideLoading();
      this.foodtype = res.data.foodtype;
      for (let i = 0; i < res.data.foodtype.length; i++) {
        this.goodInfo.push({
          typeName: res.data.foodtype[i].name,
          type_id: res.data.foodtype[i].id,
          foodList: []
        });
        for (var n = 0; n < res.data.foodlist.length; n++) {
          if (res.data.foodtype[i].id == res.data.foodlist[n].type_id) {
            res.data.foodlist[n].number = 0;
            this.goodInfo[i].foodList.push(res.data.foodlist[n]);
          }
        }
      }
      setTimeout(()=>{
        // console.log(this.$refs)
        this.getNodesData();
      },80)
    })

  },

  computed:{
    currentIndex(){
      for(var i = 0; i < this.listHeight.length; i++){
        var height1 = this.listHeight[i];
        var height2 = this.listHeight[i + 1];
        // console.log(height1,height2); 
        if(this.scrollTop + this.listHeight[0] >= height1 &&
          this.scrollTop + this.listHeight[0] < height2){
         
          this.active = i;
          return i;
        }
      }
      return this.scrollTop;
    }
  },

  methods: {
    tabs (index) {
      this.active = index;
      this.scrollId = 'po'+index;
    },
    add (data) {
      data.number++;
      this.$store.commit('add', data);
      // console.log(this.$store.state.count);
      
      // console.log(this.$store.state.count);
      
    },
    del (data) {
      if (data.number <= 0) {
        return;
      }
      data.number--;
      console.log(this.$store.state.count);
      
      this.$store.commit('add', data);
    },
    scroll(e){
      this.scrollTop = e.target.scrollTop;
      // console.log(this.scrollTop);
    },
    getNodesData(){
      var query=wx.createSelectorQuery();
      // select    id
      // selectAll class
      // console.dir()
      query.selectAll(".titlerh").boundingClientRect((nodes)=>{
        nodes.map((item)=>{
          this.listHeight.push(item.top)
        })
      }).exec();

    },
    scrolltolower(){
      setTimeout(() => {
        this.active=this.listHeight.length - 1;
      }, 80);
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
