<template>
  <div class="editor-shell">
    <EditorToolbar></EditorToolbar>
    <div class="editor">
      <MaterialPanel v-if="editor.mode !== 'preview'"></MaterialPanel>
      <EditorCanvas></EditorCanvas>
      <PropertyPanel v-if="editor.mode !== 'preview'"></PropertyPanel>
    </div>
  </div>
</template>
<script setup lang="ts">
import EditorCanvas from "./components/EditorCanvas.vue";
import EditorToolbar from "./components/EditorToolbar.vue";
import MaterialPanel from "./components/MaterialPanel.vue";
import PropertyPanel from "./components/PropertyPanel.vue";
import { useEditorStore } from "./stores/editor";
const editor = useEditorStore();
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.editor-shell {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.editor {
  flex: 1;
  min-height: 0;
  display: flex;
  width: 100%;
}
</style>
