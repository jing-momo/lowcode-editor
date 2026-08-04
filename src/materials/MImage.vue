<template>
  <img :src="src" :style="{width:width+'px'}"/>
</template>

<script setup lang="ts">
    defineProps<{
        src?:string;
        width?:number
    }>()
</script>

<style scoped>

</style>