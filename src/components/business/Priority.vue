<template>
  <span>{{ prioritis[value] }}</span>
</template>

<script>
  export default {
    name: "Priority",
    props: {
      value: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        prioritis: [
          '高',
          '中',
          '低',
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
