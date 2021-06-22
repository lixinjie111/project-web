<template>
  <div class="set-week">
    <div class="regular">
      <div class="label">常规</div>
      <div class="regular-select">
        <a-select class="select" v-model="regular.week" :default-value="regular.week" @change="handleModRegular">
          <a-select-option v-for="item in weekList" :key="item.code" :value="item.code">{{ item.desc }}</a-select-option>
        </a-select>
        <a-time-picker class="time-picker" :allowClear="false" 
          v-model="regularTime"
          format="HH:mm" 
          value-format="HH:mm"
          :popupStyle="{width: '112px'}" 
          :inputReadOnly="true" 
          @openChange="(status) => !status && handleModRegular()"
        ></a-time-picker>
      </div>
    </div>
    <div class="custom">
      <div class="label">
        自定义
        <span>（适用于节假日周报生成日期变更）</span>
      </div>
      <div class="custom-time-item" v-for="(item, index) in list" :key="index">
        <a-date-picker v-model="item.dateTime" :allowClear="false" :show-time="showTime" :inputReadOnly="true" format="YYYY/MM/DD HH:mm" value-format="YYYY-MM-DD HH:mm:ss"  @openChange="(status) => !status && handleAddTime(item)"/>
        <span class="iconfont icontianjia" @click="handlePlus(index+1)"></span>
        <span class="iconfont iconjianshao" v-if="list.length > 1" @click="handleDel(index, item.id)"></span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'SetWeek',
  data(){
    return {
      regularTime: '',
      regular: {},
      list: [],
      weekList: [
        {desc: '每周一', code: 'MON'},
        {desc: '每周二', code: 'TUE'},
        {desc: '每周三', code: 'WED'},
        {desc: '每周四', code: 'THU'},
        {desc: '每周五', code: 'FRI'},
        {desc: '每周六', code: 'SAT'},
        {desc: '每周日', code: 'SUN'},
      ],
      showTime: {
        format: "HH:mm"
      }
    }
  },
  watch: {
    regularTime(newVal, oldVal){
      let reg = /^(\d{2}):(\d{2})/ig;
      if(newVal !== oldVal && reg.test(newVal)){
        this.regular.hour = Number(RegExp.$1);
        this.regular.minute = Number(RegExp.$2);
      }
    }
  },
  methods: {
    moment,
    // 查询列表
    async handleGetSetList() {
      try {
        let {code, data} = await this.$api.report.handleGetSetList();
        if(code === 0) {
          let {dateTime, week} = data;
          this.list = dateTime?.length ? dateTime : [{dateTime: null}];
          this.regular = week;
          this.regularTime = moment(`${this.regular.hour}:${this.regular.minute}`, 'HH:mm');
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 修改常规定义
    async handleModRegular(){
      try {
        delete this.regular.description
        let {code} = await this.$api.report.handlePostRegular(this.regular);
        if(code === 0) {
          this.$message.success('修改成功！');
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 增加一条自定义
    handlePlus(index){
      this.list?.splice(index, 0, {dateTime: null});
    },
    // 新增编辑自定义
    async handleAddTime(item) {
      try {
        let {code} = await this.$api.report.handlePostTime(item);
        if(code === 0) {
          this.$message.success(item?.id ? '修改自定义设置成功！' : '添加自定义设置成功！');
          this.handleGetSetList();
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 删除自定义
    handleDel(index, id) {
      this.$confirms({
        title: '提示',
        message: `您确定要删除吗？`,
        okText: '确认',
        onOk: async () => {
          try {
            if(id) {
              let {code} = await this.$api.report.handleDelSetTime(id);
              if(code === 0) {
                this.$message.success('删除成功！');
                this.handleGetSetList();
              }
            }else{
              this.list?.splice(index, 1);
              this.$message.success('删除成功！');
            }
          }catch(error){
            console.log(error)
          }
        },
        cancelText: '取消',
        onCancel() {
        }
      });
    }
  },
  mounted(){
    this.handleGetSetList();
  }
}
</script>
<style lang="scss" scoped>
.set-week{
  padding: 24px;
  height: 100%;
  overflow: auto;
  /deep/ .ant-select-selection, /deep/ .ant-time-picker-input, /deep/ .ant-input {
    border: 1px solid #97A0C3;
  }
  .label {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #7C88B1;
      line-height: 20px;
      span {
        padding: 2px 0;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #97A0C3;
        line-height: 20px;
      }
    }
  .regular{
    .regular-select {
      margin-top: 8px;
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
      .select {
        width: 140px;
        margin-right: 15px;
      }
      .time-picker {
        width: 140px;
        vertical-align: top;
      }
    }
  }
  .custom {
    margin-top: 24px;
    .custom-time-item {
      margin-top: 8px;
      .iconfont {
        padding: 13px 5px 14px 5px;
        margin-left: 10px;
        font-size: 13px;
        color: #97A0C3;
        cursor: pointer;
      }
    }
  }
}
</style>