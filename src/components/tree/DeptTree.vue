<template>
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
</template>
<script>
export default {
  name: 'DeptTree',
  props: {

  },
  data(){
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
    handleGetDepartTree(){
      try {
        this.$store.dispatch('initDeptTree').then(() => {
          this.$set(this, 'treeList', this.handleData(this.$store.state.deptTree));
        })
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
      // let {expandedKeys, deptId} = this;
      // let bool = expandedKeys.includes(deptId);
      // console.log(bool)
      // if (!bool) {
      //   expandedKeys.push(deptId)
      //   this.expandedKeys = expandedKeys;
      // } 
      this.$emit('selected-tree', value)
    },
    // handleExpand(expandedKeys){

    // }
  },
  mounted() {
    this.handleGetDepartTree()
  }
}
</script>
<style lang="scss" scoped>
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
    // 修改箭头样式
      /deep/ .ant-select{
        .ant-select-arrow {
          &:before{
            display: inline-block;
            content: '\e638';
            font-size: 16px;
            font-family: "iconfont" !important;
            color: #97A0C3;
            transition: all 500ms;
          }
          i {
            display: none;
          }
        }
        &.ant-select-open {
          .ant-select-arrow {
            &:before{
              transform: rotate(180deg);
              transition: all 500ms;
            }
          }
        }
      }
  }
</style>