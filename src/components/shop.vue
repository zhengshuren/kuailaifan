<template>
  <div class="shop_all">
    <img src="https://img.zhipuzi.com/upload_files/image/20190525/cae29Soa7761JuMGuhL1GRrIKg1gN44g.jpg!width600" alt="" />
    <div class="rating-star">
        <div class="scorebar">
            <ul>
                <li>
                    <div class="star-inner"></div>
                </li>
                <li>
                    <div class="star-inner"></div>
                </li>
                <li>
                    <div class="star-inner"></div>
                </li>
                <li>
                    <div class="star-inner"></div>
                </li>
                <li>
                    <div class="item-wrapper">
                    <div class="star-inner_last">
                        <div class="star-inner"></div>
                    </div>
                    <div class="star-default"></div>
                    </div>
                </li>
                <span class="score">{{score}}分</span>
            </ul>
        </div>
        <div class="commentLeft">
            <p class="commentPeople">
                {{count}}人已评价
            </p>
            <i-icon type="enter" size="17" @click="jumpto"/>
        </div>
    </div>
    <div class="item">
        <div class="item_bar fristItem">
            <img src="../../static/images/dingwei.png" alt="" />
            <p>{{shopaddress}}</p>
             <i-icon type="enter" size="17" />
        </div>
        <div class="item_bar">
            <img src="../../static/images/tel.png" alt="" />
            <p>{{orderphone}}</p>
            <img class="tel" src="../../static/images/dianhua.png" alt="" />
        </div>
    </div>
    <div class="item">
        <div class="item_bar fristItem">
            <img src="../../static/images/time.png" alt="" />
            <p>营业时间：<span v-for="(item, index) in business_hours" :key="index">{{item.start}}-{{item.stop}}</span></p>
             <i-icon type="enter" size="17" />
        </div>
        <div class="item_bar">
            <img src="../../static/images/dingwei.png" alt="" />
            <p>服务区域：点此查看有效区域</p>
             <i-icon type="enter" size="17" />
        </div>
    </div>
    <div class="item">
        <div class="item_bar fristItem" @click="toast">
            <img src="../../static/images/qi.png" alt=""/>
            <p>起送价：{{basicprice}}元</p>
            <i-icon type="enter" size="17" />
        </div>
        <div class="item_bar" @click="handleopen2">
            <img src="../../static/images/end.png" alt="" />
            <p>配送费：{{delivery_fee}}元</p>
             <i-icon type="enter" size="17" />
        </div>
        <i-modal :visible="visible1" @ok="handleClose1" @cancel="handleClose1">
            <view>起送价：{{basicprice}}元</view>
        </i-modal>
        <i-modal :visible="visible2" @ok="handleClose2" @cancel="handleClose2">
            <view>配送费：{{delivery_fee}}元</view>
        </i-modal>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      count: 0,
      score: 0,
      shopaddress: '',
      orderphone: '',
      business_hours: [],
      basicprice: 0,
      delivery_fee: 0,
      visible1: false,
      visible2: false,
    }
  },
  methods: {
    toast () {
        this.visible1 = true;
    },
    handleClose1 () {
        this.visible1 = false;
    },
    handleopen2 () {
        this.visible2 = true;
    },
    handleClose2 () {
        this.visible2 = false;
    },
    jumpto () {
        this.$eventHub.$emit('tabChange', 1);
    },
    getInfo () {
        wx.showLoading({
        });
        this.$apis.getChooseInfo().then(res => {
            wx.hideLoading();
            this.count = res.data.shop.comment_num;
            this.score = res.data.commentgrade;
            this.shopaddress = res.data.shop.shopaddress;
            this.orderphone = res.data.shop.orderphone;
            this.business_hours = res.data.shop.business_hours;
            this.basicprice = res.data.shop.basicprice;
            this.delivery_fee = res.data.shop.delivery_fee;
        })
    }
    
  },
  mounted(){
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.shop_all {
 height: 410px;
 overflow: auto;
 img {
    height: 265px;
    width: 100%;
    overflow: hidden;
 }
 .commentLeft {
    display: flex;
 }
 .rating-star {
    height: 20px;
    padding: 9.5px 0 12px;
    margin: 0 16.5px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    ul {
        display: flex;
        .score {
            margin-left: 24px;
            color: #fcbb2b;
            line-height: 15px;
            font-size: 13px;
        }
        position: relative;
    }
    .star-inner {
        width: 14px;
        height: 14px;
        background-image: url(../../static/images/star2.png);
        background-size: cover;
    }
    /* 最后一颗星 */
    .star-inner_last {
        position: absolute;
        z-index: 2;
        width: 7px;
        height: 14px;
        overflow: hidden;
        .star-inner {
            width: 14px;
            height: 14px;
            background-image: url(../../static/images/star.png);
            background-size: cover;
        }
    }
    .star-default {
        z-index: 1;
        position: absolute;
        width: 14px;
        height: 14px;
        background-image: url(../../static/images/star2.png);
        background-size: cover;
    }

    .commentPeople {
      margin-right: 18px;
      color: #373737;
    }
 }

 .item {
    border-top: 10px solid #f5f5f5;
    .item_bar {
        display: flex;
        padding: 14px 0 12px;
        margin: 0 0 0 16.5px;
        font-size: 17px;
        img {
            width: 17px;
            height: 17px;
            margin-right: 22px;
        }
        p {
            width: 262px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 22px;
        }
        .tel {
            width: 23px;
            height: 23px;
        }
    }
    .fristItem {
        border-bottom: 1px solid #f5f5f5;
    }
 }

}
</style>
