<template>
  <span class="iconfont" :class="type ? type + ' ' + iconName : iconName"></span>
</template>

<script>
  export default {
    name: "MyIcon",
    props: ['name', 'type'],
    computed: {
      iconName() {
        return this.name;
      }
    }
  }
</script>

<style scoped>
.main {
  color: #0064FF;
}
</style>
