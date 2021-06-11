<template>
  <ModalNoFooter width="640" :isShow="isShow" :bodyStyle="{padding: 0}" title="设置" @modal-cancel="$emit('modal-cancel')">
    <div class="content" slot="content">
      <ul class="nav">
        <li :class="['nav-item', isActive === item.key ? 'is-actived' : '']" v-for="(item, index) in nav" :key="index" @click="handleChangeNav(item)">{{item.name}}</li>
      </ul>
      <div class="set-content">
        <SetWeek v-if="isActive === 'week'"></SetWeek>
        <SetProject v-if="isActive === 'project'" @modal-cancel="$emit('modal-cancel')"></SetProject>
      </div>
    </div>
  </ModalNoFooter>
</template>
<script>
import ModalNoFooter from '@/components/Modal/ModalNoFooter.vue'
import SetWeek from './SetWeek.vue'
import SetProject from './SetProject.vue'
export default {
  name: 'SetModal',
  components: {ModalNoFooter, SetWeek, SetProject},
  data(){
    return {
      isShow: true,
      isActive: 'week',
      nav: [
        {name: '自动生成周报时间设置', key: 'week'},
        {name: '重点项目设置', key: 'project'}
      ]
    }
  },
  methods: {
    handleChangeNav(item){
      this.isActive = item.key;
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  display: flex;
  height: 470px;
  .nav {
    width: 180px;
    border-right: 1px solid #EAEDF7;
    .nav-item {
      padding-left: 24px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      &.is-actived {
        position: relative;
        color: #0064FF;
        &::before {
          position: absolute;
          left: 0;
          content: '';
          width: 4px;
          height: 48px;
          background: #0064FF;
        }
      }
    }
  }
  .set-content{
    flex: 1;
  }
}
</style>