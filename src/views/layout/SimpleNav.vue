<template>
  <div>
    <HeaderNav></HeaderNav>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderNav from '@/components/MenuNav.vue'
export default {
  components: {HeaderNav}
}
</script>
