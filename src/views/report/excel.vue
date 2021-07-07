<template>
  <div class="preview">
    <iframe :src="excel"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      excel: ''
    }
  },
  mounted () {
    let {url} = this.$route.query;
    this.excel = url ? `https://view.officeapps.live.com/op/view.aspx?src=${url}` : '';
  }
}
</script>
<style lang="scss" scoped>
.preview {
  padding: 24px 16px;
  width: 100%;
  height: 100%;
  > iframe {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>