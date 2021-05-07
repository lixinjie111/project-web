<template>
  <div class="userorg-container">
    <ContentHeader type="title" title="用户管理">
      <div slot="operation">
        <a-button type="primary">添加用户</a-button>
      </div>
    </ContentHeader>
    
    <div class="userorg-content">
      <div class="userorg-left">
        <div class="userorg-tree">
          <Tree></Tree>
        </div>
        <div class="btn" @click="handleGotoPage">管理部门结构</div>
      </div>
      <div class="userorg-right"></div>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue';
import ContentHeader from '@/components/ContentHeader.vue'
export default {
  name: 'userorg',
  components: {Tree,ContentHeader},
  data() {
    return {
      
    }
  },
  methods: {
    handleGotoPage() {
      this.$router.push('/org/depart')
    }
  }
}
</script>
<style lang="scss" scoped>
.userorg-container{
  margin: 16px 24px 24px 24px;
  
  .userorg-left{
    padding: 24px 24px 32px 24px;
    width: 280px;
    height: calc(100vh - 163px);
    background: #EAEDF7;
    .userorg-tree {
      height: calc(100% - 40px);
    }
    .btn {
      margin: 0 auto;
      width: 160px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      background: #2373FF;
      border-radius: 4px;
    }
  }
}
  
</style>