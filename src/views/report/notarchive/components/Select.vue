<template>
  <div class="select">
    <a-dropdown :trigger="['click']">
      <div :class="['btn', `status${value.status}`]">
        <span>{{value.name}}</span>
        <span class="iconfont iconxia1"></span>
      </div>
      <a-menu slot="overlay" @click="handleSelect">
        <a-menu-item v-for="(item,index) in acceptanceList" :key="index">{{item.name}}</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import Priority from "@/components/business/Priority"
export default {
  name: 'Select',
  components: {Priority},
  props: {
    status: null
  },
  data() {
    return {
      value: {},
      acceptanceList: [
        { status: 1, name: '不匹配' },
        { status: 2, name: '待验收' },
        { status: 3, name: '已通过' },
        { status: 4, name: '已取消' },
        { status: 5, name: '已延期' },
        { status: 6, name: '未通过' }
      ]
    }
  },
  watch: {
    status: {
      handler(val){
        this.value = this.acceptanceList.find(item => item.status === val);
      },
      immediate: true
    }
  },
  methods: {
    handleSelect({key}){
      this.$emit('selected-status', this.acceptanceList[key].status)
    }
  }
}
</script>
<style lang="scss" scoped>
.select {
  .btn {
    display: inline-block;
    padding: 0 8px;
    height: 24px;
    border-radius: 2px;
    text-align: center;
    line-height: 24px;
    font-size: 0;
    > span {
      font-size: 12px;
      &:nth-child(1){
        margin-right: 4px;
      }
    }
  }
  $colors: #97A0C3 ,#0064FF , #08BD6C, #97A0C2, #FE774B, #FF4C60;
  @each $clr in $colors {
    $i: index($colors, $clr);
    .status#{$i} {
      background: rgba(255, 255, 255, 0.01);
      color: $clr;
      cursor: default;
      border: 1px solid $clr;
    }
  }
}
</style>