<template>
  <ul class="tabs">
    <li v-for="tab in tabs" :key="tab" :class="{active: tab === selectedTab}" @click="onClickTabs(tab)">
      {{tab}}
    </li>
  </ul>
</template>

<script>
export default {
    props: ['tabs', 'selectedTab'],
    methods: {
        onClickTabs(tab){
            this.$emit('@change', tab)
        }
    }
}
</script>
