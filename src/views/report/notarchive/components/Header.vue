<template>
  <div class="header">
    <div class="header-container">
      <span class="title">{{title}}</span>
      <span class="date">
        <i class="iconfont iconrili"></i>
        {{date}}
      </span>
    </div>
    <div class="select-container">
      <div class="depart">
        <span class="label">部门</span>
        <span class="select">
          <a-tree-select
              v-model="deptId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :default-value ="deptId"
              :tree-data="treeList"
              @select="handleSelected"></a-tree-select>
        </span>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    title: '',
    date: '',

  },
  data() {
    return {
      deptId: this.$store.state.users.userInfo.deptId, // 查询部门id
      treeList: [], // 部门树
      replaceFields: {
          key: 'id',
          value: 'id',
          title: 'name',
          children: 'children'
      },
    }
  },

  methods: {
    // 查询部门树
    async handleGetDepartTree(){
      try {
        let {code, data} = await this.$api.org.getDeptTree();
        if(code === 0){
            this.$set(this, 'treeList', this.handleData(data));
        }
      }catch(error){
        console.log(error);
      }
    },
    handleData(data){
      let {key, title, value, children} = this.replaceFields;
      data.map((item, index) => {
        item['key'] = item[key];
        item['value'] = item[value ? value : key];
        item['title'] = item[title];
        if(item[children]) item['children'] = item[children];
        if(item['children']?.length){
          this.handleData(item['children'])
        }
      });
      return data;
    },
    // 选中
    handleSelected(value) {
      this.$emit('selected-tree', value)
    }
  },
  mounted() {
    this.handleGetDepartTree()
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 0 8px;
}
.header-container {
  height: 44px;
  line-height: 44px;
  .title {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #242F57;
    &:after {
      display: inline-block;
      content: '';
      width: 13px;
      height: 16px;
      margin-right: 12px;
      border-right: 1px solid #EAEDF7;
    }
  }
}

.select-container {
  height: 60px;
  padding: 14px 0;
  .label {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #636E95;
    line-height: 24px;
  }
  .select {
    display: inline-block;
    margin-left: 12px;
    width: 240px;
    height: 32px;
    background: #FFFFFF;
    /deep/ .ant-select-selection--single, /deep/ .ant-select-selection__rendered {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>