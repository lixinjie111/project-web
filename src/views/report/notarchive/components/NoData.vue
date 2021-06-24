<template>
  <div class="no-data">
    <img src="@/assets/images/report/no-data.png" />
    <div class="title">{{title}}</div>
    <a-button v-if="isInPermission('business_jobproject_add')" type="primary" @click="isShow = true;">更新生成时间</a-button>
    <SetModal v-if="isShow" @modal-cancel="isShow = false"></SetModal>
  </div>
</template>
<script>
import {isInPermission} from '@/utils/common.js'
import SetModal from './SetModal'

export default {
  name: 'NoData',
  components: {SetModal},
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {isInPermission}
}
</script>
<style lang="scss" scoped>
.no-data {
  padding: 64px 0;
  text-align: center;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #EAEDF7;
  > img {
    margin: 0 auto;
    width: 102px;
    height: 102px;
  }
  .title {
    height: 50px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #7C88B1;
    line-height: 50px;
  }
}
</style>