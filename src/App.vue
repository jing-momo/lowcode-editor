<template>
  <div class="editor">
    <MaterialPanel></MaterialPanel>
    <EditorCanvas></EditorCanvas>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
<script setup lang="ts">
import EditorCanvas from './components/EditorCanvas.vue';
import MaterialPanel from './components/MaterialPanel.vue';
import PropertyPanel from './components/PropertyPanel.vue';
</script>
<style scoped> 
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .editor{
    width: 100%;
    display: flex;
    height: 100vh;
  }
</style>


