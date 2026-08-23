<template>
  <button :type="btnType" :class="btnType">{{ text }}</button>
</template>

<script setup lang="ts">
    defineProps<{
        text?:string,
        btnType?:'button'|'submit'|'reset'
    }>()
</script>

<style scoped>
    button{
        padding: 6px 16px;
        border: none;
        border-radius: 4px;
        cursor:pointer;
        color: #fff;
    }
    .button{
        background-color: #6b7280;
    }
    .submit{
        background-color: #2563eb;
    }
    .reset{
        background-color: #ef4444;
    }
</style>