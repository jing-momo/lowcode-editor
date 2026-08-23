<template>
  <div class="editor-toolbar">
    <button type="button" :disabled="!editor.canUndo" @click="editor.undo">
      撤销
    </button>
    <button type="button" :disabled="!editor.canRedo" @click="editor.redo">
      重做
    </button>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "../stores/editor";
const editor = useEditorStore();
</script>

<style scoped>
.editor-toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
