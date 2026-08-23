<template>
  <div class="editor-toolbar">
    <button
      type="button"
      :disabled="!editor.canUndo || editor.isPreview"
      @click="editor.undo"
    >
      撤销
    </button>
    <button
      type="button"
      :disabled="!editor.canRedo || editor.isPreview"
      @click="editor.redo"
    >
      重做
    </button>
    <button
      type="button"
      :class="{ active: editor.mode === 'edit' }"
      @click="editor.setMode('edit')"
    >
      编辑
    </button>
    <button
      type="button"
      :class="{ active: editor.mode === 'preview' }"
      @click="editor.setMode('preview')"
    >
      预览
    </button>
    <button type="button" @click="exportJSON">导出JSON</button>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "../stores/editor";
const editor = useEditorStore();
function exportJSON() {
  const json = JSON.stringify(editor.schema, null, 2);
  const blob = new Blob([json], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lowcode-schema.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
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
button.active {
  color: #fff;
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>
