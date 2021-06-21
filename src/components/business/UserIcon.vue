<template>
  <div class="icon" :class="'size'+size">
    {{showName}}
    <i class="iconfont iconshanchu_xiao" @click="$emit('close')" v-if="closable"></i>
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
  display: inline-block;

  .iconfont {
    width: 14px;
    height: 14px;
    font-size: 12px;
    background: #EAEDF7;
    border: 1px solid #FFFFFF;
    color: #333333;
    border-radius: 7px;
    position: absolute;
    right: -4px;
    top: -4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
  .size1 {
    $height1: 36px;

    width: $height1;
    height: $height1;
    background: #75B1FF;
    border-radius: $height1 / 2;
    font-size: 16px;
  }
</style>
