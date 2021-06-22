<template>
  <a-popover trigger="click" v-model="visible" placement="bottomLeft" @visible-change="handleShow" overlay-class-name="hours-pop">
    <TwoValue :title="showValue + '小时'" :subtitle="title" class="btn">
      <i class="iconfont" :class="icon"></i>
    </TwoValue>
      <template slot="content">
        <div>{{title}}</div>
        <a-input :value="showValue" @input="handleInput" ref="input">
          <template slot="suffix">
            小时
          </template>
        </a-input>
      </template>
  </a-popover>
</template>

<script>
  import TwoValue from "./TwoValue";

  export default {
    name: "HoursSelect",
    props: ['title', 'value', 'icon'],
    components: {TwoValue},
    data() {
      return {
        // hours: 0,
        visible: false,
      }
    },
    computed: {
      showValue() {
        if (typeof this.value === 'number')
          return this.value;
        return 0;
      }
    },
    methods: {
      handleInput(e) {
        let val = e.target.value;
        // this.hours = val;
        // this.visible = false;
        let reg = /\d+/;
        let m = val.match(reg);
        if (!m)
          val = 0;
        else
          val = parseInt( m[0] );
        this.$emit('change', val);
      },
      handleShow(visible) {
        if (visible) {
          setTimeout(() => {
            this.$refs.input.focus();
          }, 200);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn {
  cursor: default;
}
</style>
<style lang="scss">
  .hours-pop {
    .ant-popover-inner-content {
      padding: 24px;
    }
  }
</style>
