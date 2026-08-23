<template>
  <div class="material-panel">
    <div class="panel-title">物料区</div>
    <div
      v-for="m in materials"
      :key="m.type"
      class="materail-item"
      draggable="true"
      @dragstart="handleDragStart($event, m.type)"
    >
      {{ m.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { materials } from "../materials";

function handleDragStart(event: DragEvent, type: string) {
  // 把type存入dataTransfer
  if (!event.dataTransfer) return;
  // 携带 物料类型
  event.dataTransfer.setData("text/plain", type);
  // 执行的操作是复制新导入
  event.dataTransfer.effectAllowed = "copy";
}
</script>

<style scoped>
.material-panel {
  width: 200px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: 12px;
}
.panel-title {
  font-weight: bold;
  margin-bottom: 12px;
}
.materail-item {
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: move;
}
</style>
