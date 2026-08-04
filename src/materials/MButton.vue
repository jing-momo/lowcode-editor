<template>
  <button :type="btnType">{{ text }}</button>
</template>

<script setup lang="ts">
    defineProps<{
        text?:string,
        btnType?:'button'|'submit'|'reset'
    }>()
</script>

<style scoped>

</style>