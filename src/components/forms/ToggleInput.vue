<template>
  <div>
    <div @click="handleClick" v-show="!edit">
      <slot />
    </div>
    <a-input :value="value" v-show="edit" @input="handleChange" @blur="handleEnd" @pressEnter="handleEnd" />
  </div>
</template>

<script>
  export default {
    name: "ToggleInput",
    props: ['value'],
    data() {
      return {
        edit: false,
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('input', e.target.value);
      },
      handleClick() {
        this.edit = true;
      },
      handleEnd() {
        this.edit = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
.title {
  height: 29px;
  font-size: 21px;
  font-weight: 500;
  color: #242F57;
  line-height: 29px;
}
</style>
