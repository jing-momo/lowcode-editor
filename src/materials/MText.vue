<template>
  <div :style="{color,fontSize: fontSize+'px'}">{{ text }}</div>
</template>

<script setup lang="ts">
    defineProps<{
        text?:string;
        color?:string;
        fontSize?:number
    }>()
</script>

<style scoped>

</style>