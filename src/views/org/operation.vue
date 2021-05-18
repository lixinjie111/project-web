<template>
  <div class="operation-container">
    <ContentHeader type="breadcrumb" :breadcrumbList="breadcrumbList">
      <a-button type="primary" @click="handleSave">保存</a-button>
    </ContentHeader>
    <div class="operation-content">
      <!-- <div class="tab-content">
        <ul class="tab-list">
          <li :class="['tab-item', item.code === activeTab ? 'active' : '']" v-for="(item, index) in tabs" :key="index" @click="handleTabs(item.code)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div> -->
      <div class="menu-content">

      </div>
    </div>
  </div>
</template>
<script>

import * as api from '@/api/index'
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      breadcrumbList: [
        {name: '角色分组', icon: 'iconjiantouzuo', iconposition: 'before', path: '/org/role'},
        {name: '项目经理', icon: 'iconsuoding', iconposition: 'after'},
      ],
      tabs: [
        {name: '所有权限', code: 'all'},
        {name: '产品', code: '1'},
        {name: '项目', code: '2'},    
        {name: '测试', code: '3'},
        {name: '文档', code: '4'}
      ],
      activeTab: 'all'
    }
  },
  created(){
    let {roleName} = this.$route.query;
    this.breadcrumbList[1].name = roleName;
  },
  methods: {
    handleTabs(code){
      this.activeTab = code;
      // 请求
    },
    // 请求菜单列表
    async handleGetMenuList() {
      try{
        let {code, data, msg} = api.org.handleGetMenuTree();
      }catch(err){
        console.log(err)
      }
    },
    // 保存
    handleSave(){

    }
  }
}
</script>
<style lang="scss" scoped>
.operation-container {
  margin: 16px 24px 24px 24px;
  .operation-content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: calc(100vh - 163px);
    
    .tab-content {
      padding: 0 24px;
      margin-bottom: 16px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EAEDF7;
    }
    .tab-list {
      overflow-x: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      
      .tab-item {
        position: relative;
        margin: 0 40px 0 24px;
        flex-shrink: 0;
        color: #97A0C3;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
        }
        > span {
          line-height: 56px;
        }
        &:hover, &.active{
          color: #242F57;
          &:after {
            position: absolute;
            line-height: 0;
            width: 100%;
            height: 2px;
            content: '';
            bottom: 0;
            left: 0;
            background: #0064FF;
          }
        }
      }
    }
    .menu-content {
      flex: 1;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #EAEDF7;
    }
  }
}
</style>