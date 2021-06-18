<template>
  <div class="set-project-container">
    <div class="content">
      <!-- <a-checkbox-group> -->
        <!-- 一级树全展示 竖形列表 -->
        <div class="list" v-for="(item, index) in list" :key="index">
          <div class="list-title">{{item.title}}</div>
          <div class="level-1">
            <div class="list-item" v-for="(ele, idx) in item.children" :key="index-idx">
              <a-checkbox :default-checked="ele.flag === '1'" :value="ele.projectId" @change="(e) => ele.flag = ele.flag === '0' ? '1' : '0'">{{ele.title}}</a-checkbox>
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
          this.list = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSaveProject() {
      try {
        let data = this.handleData(this.list, []); 
        let {code} = await this.$api.report.handlePostVipWeek(data);
        if(code === 0){
          this.$message.success('重点项目设置成功！');
          this.$emit('modal-cancel');
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleData(list, checkList) {
      list.map(item => {
        item.flag = item.children?.findIndex(item => item.flag === '1') > -1 ? '1' : '0';
        item.flag === '1' && checkList.push(...item.children.filter(ele => ele.flag && delete ele.children));
        delete item.children;
        item.flag === '1' && checkList.push(item);
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
        /deep/ .ant-checkbox + span {
          color: #636E95;
        }
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