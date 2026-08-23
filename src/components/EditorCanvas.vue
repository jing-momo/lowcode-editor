<template>
  <div class="editor-canvas" @dragover="handleDragOver" @drop="handleDrop">
    <Renderer :nodes="editor.schema"></Renderer>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "../stores/editor";
import Renderer from "./Renderer.vue";

const editor = useEditorStore();

function handleDragOver(event: DragEvent) {
  if (editor.isPreview) return;
  // 取消浏览器默认的不允许复制的行为
  event.preventDefault();
  if (event.dataTransfer) {
    // 要在这里进行复制操作
    event.dataTransfer.dropEffect = "copy";
  }
}
function handleDrop(event: DragEvent) {
  if (editor.isPreview) return;
  event.preventDefault();
  if (!event.dataTransfer) return;
  const type = event.dataTransfer.getData("text/plain");
  if (!type) return;
  editor.addNode(type);
}
</script>

<style scoped>
.editor-canvas {
  flex: 1;
  background-color: #fff;
  padding: 16px;
}
</style>
