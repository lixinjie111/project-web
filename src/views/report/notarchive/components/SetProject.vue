<template>
  <div class="set-project-container">
    <div class="content">

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
      
    }
  },
  methods: {
    handleSaveProject() {

    }
  }
}
</script>
<style lang="scss" scoped>
.set-project-container {
  .content {
    padding: 16px 24px;
    height: 405px;
    overflow: auto;
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