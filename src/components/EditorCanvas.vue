<template>
  <div class="editor-canvas">
    <Renderer :nodes="editor.schema"></Renderer>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '../stores/editor';
import Renderer from './Renderer.vue';

const editor = useEditorStore()
</script>

<style scoped>
    .editor-canvas{
        flex:1;
        background-color: #fff;
        padding: 16px;
    }
</style>