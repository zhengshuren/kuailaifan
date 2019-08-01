<template>
  <!-- <scroll-view scroll-y> -->
    <div class="comments_all">
        <div class="commentHeader">
        <div class="headerLeft">
            <h1>{{score}}</h1>
            <p class="average">平均的分</p>
            <p class="num">（评论数 <span> {{commentCount}} </span> 条）</p>
        </div>
        <div class="headerRight">
            <div class="star top">
                <ul class="starLine">
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                </ul>
                <div class="score">{{commentgradePeople.grade_5}}</div>
            </div>
            <div class="star">
                <ul class="starLine">
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="blankStar"></div></li>
                </ul>
                <div class="score">{{commentgradePeople.grade_4}}</div>
            </div>
            <div class="star">
                <ul class="starLine">
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                </ul>
                <div class="score">{{commentgradePeople.grade_3}}</div>
            </div>
            <div class="star">
                <ul class="starLine">
                    <li><div class="lightStar"></div></li>
                    <li><div class="lightStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                </ul>
                <div class="score">{{commentgradePeople.grade_2}}</div>
            </div>
            <div class="star">
                <ul class="starLine">
                    <li><div class="lightStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                    <li><div class="blankStar"></div></li>
                </ul>
                <div class="score">{{commentgradePeople.grade_1}}</div>
            </div>
        </div>
        
    </div>
    <div class="comment-middle">
        <div class="comment-middle-wrap">
            <span v-for="(item, index) in tag_num" @click="tabChange(index)" :key="index" :class="active === index ? 'active' : ''">
                {{item.name}}({{item.num}})
            </span>
        </div>
    </div>
    <div class="comment-bottom">
        <ul class="comment-list">
            <li v-for="(item, index) in commentList" :key="index">
                <div class="customer-name">
                    {{item.lewaimai_customer_id}}
                    <i-cell-group>
                      <i-cell title="自定义星星个数">
                        <i-rate 
                          :count="5"
                          :value="item.grade">
                        </i-rate>
                      </i-cell>
                    </i-cell-group>
                </div>
                <p class="customer-rating">{{item.content}}</p>
                <!-- v-if="item.imgurl.length > 0"  -->
                <img  v-for="(img, num) in item.imgurl" :key="num" :src="'https://img.zhipuzi.com' + img"/>
                <p class="date">{{item.time}}</p>
            </li>
        </ul>
    </div>
    </div>
  <!-- </scroll-view> -->
</template>

<script>
import './css/comments.scss';
export default {
  data(){
    return {
      // 店铺分数
      score: 0,
      // 评论数量
      commentCount: 0,
      // 评论列表
      commentList: [],
      // 评论人数
      commentgradePeople: {},
      // 标签
      tag_num: [],
      // 选择
      active: 0,
      // 种类
      tag: 0
    }
  },
  methods: {
    tabChange (index) {
        this.active = index;
        this.tag = index;
    },
    getInfo (tag) {
        wx.showLoading({
        });
        this.$apis.getComments(tag).then(res => {
            wx.hideLoading();
            this.score = res.data.commentgrade;
            this.commentCount = res.data.commentPeople;
            this.commentList = res.data.comments;
            this.$apis.getChooseInfo().then(res => {
                this.commentgradePeople = res.data.commentgradePeople;
                this.tag_num = res.data.tag_num;
            })
        });
    }
  },
  mounted(){
    this.getInfo(this.tag);
  },
  // 事件监听
  watch: {
    'tag': function(newVal){
        this.getInfo(newVal);
    }
  }
}
</script>

<style lang="scss" scoped>


</style>
