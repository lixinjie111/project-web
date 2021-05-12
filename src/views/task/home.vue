<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <a-radio-group default-value="a" size="large">
          <a-radio-button value="a" class="all">
            全部
            <span>8</span>
          </a-radio-button>
          <a-radio-button value="b">
            指派给我
          </a-radio-button>
          <a-radio-button value="c">
            在周报中显示
          </a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            列表 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              列表
            </a-menu-item>
            <a-menu-item key="1">
              看板
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <FlatButton>
          新建任务
          <MyIcon slot="icon" name="plus"/>
        </FlatButton>
        <a-divider type="vertical" />
        <FlatButton>
          导出
          <MyIcon slot="icon" name="export"/>
        </FlatButton>
      </div>
    </div>
    <TreeTable></TreeTable>
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";

  export default {
    name: 'TaskHome',
    components: { TreeTable, FlatButton, MyIcon },
    props: {
      msg: String
    },
    methods: {
      handleClick() {
        console.log('test')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  .header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #EAEDF7;
    padding: 0 8px;
    margin-bottom: 16px;

    .left {
      display: flex;
      align-items: center;
    }
    .all {
      span {
        line-height: 16px;
        border-radius: 4px;
        border: 1px solid #EAEDF7;
        padding: 0 8px;
        width: 8px;
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #242F57;
        margin-left: 4px;
      }
    }
  }
}
</style>
