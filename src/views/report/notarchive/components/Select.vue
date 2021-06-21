<template>
  <div class="select" >
    <a-dropdown v-if="type" :trigger="['click']">
      <div :class="['btn', `status${value.status}`]">
        <span>{{value.name}}</span>
        <span class="iconfont iconxia1"></span>
      </div>
      <a-menu slot="overlay" @click="handleSelect">
        <a-menu-item v-for="(item,index) in acceptanceList" :key="index">{{item.name}}</a-menu-item>
      </a-menu>
    </a-dropdown>
    <div v-else :class="['btn', `status${value.status}`]">{{value.name}}</div>
  </div>
</template>
<script>
import Priority from "@/components/business/Priority"
export default {
  name: 'Select',
  components: {Priority},
  props: {
    status: null,
    type: { // select展示形式 true select, false text
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: {},
      acceptanceList: [
        { status: 1, name: '待验收' },
        { status: 2, name: '已通过' },
        { status: 3, name: '已延期' },
        { status: 4, name: '已取消' },
        { status: 5, name: '不匹配' },
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
  },
  mounted(){
    console.log(this.type)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
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
  $colors: $acceptance-font;
  @each $clr in $colors {
    $i: index($colors, $clr);
    .status#{$i} {
      font-size: 12px;
      background: rgba(255, 255, 255, 0.01);
      color: $clr;
      cursor: default;
      border: 1px solid $clr;
    }
  }
}
</style>