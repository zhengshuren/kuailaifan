<template>
  <div>
    <ul class="tab">
      <li v-for="(item, index) in list" :key="index"  @click="Tab(index)">
        <span :class="active === index ? 'active' : ''" >{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list:[
        {title: '选购'},
        {title: '评价'},
        {title: '商家'}
      ],
      active: 0,
    };
  },

  computed : {
    tabIndex () {
      this.$eventHub.$on('tabChange', res => {
        this.active = res;
      });
    }
  },

  methods: {
    Tab (index) {
      this.$eventHub.$emit('tabChange', index)
      this.active = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;; 
  li {
    width: 33.3%;
    height: 40.5px;
    text-align: center;
    font-size: 16px;
    line-height: 40.5px;
    z-index: 1;
    span {
      display: inline-block;
      padding: 0 11.8px;
    }
    .active {
      border-bottom: 1px solid red;
      font-weight: 800;
    }
  }
}
</style>
