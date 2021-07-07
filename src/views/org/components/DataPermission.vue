<template>
  <section class="data-permission">
    <a-dropdown :trigger="['click']" overlay-class-name="data-permission-menu">
      <a-button>
        <span class="iconfont iconshujuku"></span>
        <span>数据权限</span>
      </a-button>
      <a-menu slot="overlay" @click="handleSelect">
        <a-menu-item v-for="(item,index) in list" :key="index">
          <div class="title">
            <span>{{item.title}}</span>
            <span v-if="selected == item.value" class="selected iconfont iconxiaoyan1"></span>
          </div>
          <div v-if="item.subTitle" class="sub-title">{{item.subTitle}}</div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <CustomDeptModal v-if="isShow" @modal-cancel="isShow = false"></CustomDeptModal>
  </section>
</template>
<script>
import CustomDeptModal from './CustomDeptModal.vue';
export default {
  name: 'DataPermission',
  components: {CustomDeptModal},
  props: {
    selected: {
      type: Number|String,
      default: null
    }
  },
  data(){
    return {
      isShow: false,
      list: [
        {title: '本部门', subTitle: '可以查看自身所在部门的数据', value: 0},
        {title: '本部门及子部门', subTitle: '可以查看自身所在部门及子部门的数据', value: 1},
        {title: '所有部门', subTitle: '可以查看所有部门的数据', value: 2},
        {title: '自定义可见部门', subTitle: '', value: 3},
      ]
    }
  },
  methods: {
    handleSelect({ item, key, keyPath }){
      if(key == 3){
        this.isShow = true;
      } else {
        // 接口保存
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.data-permission-menu {
  .ant-dropdown-menu {
    width: 304px;
    padding: 4px 0 0 0;
    box-shadow: 0px 2px 12px 0px rgba(0, 24, 102, 0.08);
    border-radius: 4px;
  }
  .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
    padding: 16px;
    &:last-child{
      padding: 12px 16px;
      border-top: 1px solid #EAEDF7;
    }
  }
  .title {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #242F57;
    line-height: 24px;
    .selected {
      margin-left: 18px;
    }
  }
  .sub-title {
    margin-top: 2px;
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #7C88B1;
    line-height: 22px;
  }
}
</style>