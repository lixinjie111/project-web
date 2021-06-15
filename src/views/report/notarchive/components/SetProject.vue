<template>
  <div class="set-project-container">
    <div class="content">
      <!-- <a-checkbox-group> -->
        <!-- 一级树全展示 竖形列表 -->
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="list-title">{{item.title}}</div>
          <div class="level-1">
            <div class="list-item" v-for="(ele, idx) in item.children" :key="index-idx">
              <a-checkbox :default-checked="ele.checked" :value="ele" @change="(e) => ele.checked = !ele.checked">{{ele.title}}</a-checkbox>
            </div>
          </div>
        </div>
      <!-- </a-checkbox-group>   -->
    </div>
    <div class="footer">
      <a-button class="cancel" type="link" @click="$emit('modal-cancel')">取消</a-button>
      <a-button type="primary" @click="handleSaveProject">保存</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SetProject',
  data(){
    return {
      list: [],
      checkedList: [],
    }
  },
  methods: {
    async handleGetList(){
      try {
        let {code, data} = await this.$api.report.handleGetVipWeekList();
        if(code === 0) {
          data.map(item => {
            item.checked = false;
            item.children.map(ele=>ele.checked = false)
          })
          this.list = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleSaveProject() {
      try {
        let data = this.handleData(this.list, []); 

      } catch (error) {
        console.log(error)
      }
    },
    handleData(list, checkList) {
      list.map(item => {
        item.checked = item.children?.findIndex(item => item.checked) > -1 ? true : false;
        item.checked && checkList.push(item, ...item.children.filter(item => item.checked));
      });
      return checkList;
    }
  },
  mounted() {
    this.handleGetList();
  }
}
</script>
<style lang="scss" scoped>
.set-project-container {
  .content {
    padding: 16px 24px;
    height: 405px;
    overflow: auto;
    /deep/ .ant-checkbox-group {
      display: block;
    }
    .list {
      &:first-child{
        margin-top: -16px;
      }
      .list-title {
        margin-top: 16px;
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #242F57;
        line-height: 22px;
      }
      .list-item {
        line-height: 46px;
      }
    }
    
  }
  .footer{
    padding: 16px 24px;
    flex-shrink: 0;
    text-align: end;
    border-top: 1px solid #EAEDF7;
    .cancel {
      margin-right: 10px;
      color: #636E95;
    }
  }
}

</style>