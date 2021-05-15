<template>
  <div class="icon">
    {{showName}}
    <i class="iconfont iconjianshao"></i>
  </div>
</template>

<script>
  export default {
    name: "UserIcon",
    props: {
      value: {
        type: String,
        default: '',
      },
      length: {
        type: Number,
        default: 2,
      },
      size: {
        type: Number,
        default: 2,
      },
      closable: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      showName() {
        return this.value.substr(0 - this.length);
      }
    }
  }
</script>

<style lang="scss" scoped>
  $height: 32px;
.icon {
  width: $height;
  height: $height;
  background: #75B1FF;
  border-radius: $height / 2;
  font-size: 12px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: $height;
  cursor: default;
  text-align: center;
  position: relative;

  .iconfont {
    width: 14px;
    height: 14px;
    background: #EAEDF7;
    border: 1px solid #FFFFFF;
    color: #333333;
    border-radius: 7px;
    position: absolute;
    right: -2px;
    top: -2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
