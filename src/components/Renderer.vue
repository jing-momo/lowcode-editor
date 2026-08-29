<!-- 渲染到画布-->
<template>
  <div
    v-for="item in nodes"
    :key="item.id"
    v-memo="[item.props, editor.selectedId === item.id, editor.isPreview]"
    class="node-wrap"
    :class="{
      editable: !editor.isPreview,
      selected: !editor.isPreview && editor.selectedId === item.id,
    }"
    @click.stop="selectNode(item.id)"
  >
    <!-- 遍历schema 每个节点渲染成对应物料组件 -->
    <component :is="materials[item.type].component" v-bind="item.props" />
    <!-- 有子节点就递归（当前物料没children，这段先不触发，做容器组件是生效） -->
    <Renderer v-if="item.children?.length" :nodes="item.children"></Renderer>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSchema } from "../materials/types";
// 与物料对应
import { materials } from "../materials";
import { useEditorStore } from "../stores/editor";
// 接收 ComponentSchema 类型的prop
defineProps<{ nodes: ComponentSchema[] }>();
const editor = useEditorStore();
function selectNode(id: string) {
  if (editor.isPreview) return;
  editor.selectNode(id);
}
</script>

<style scoped>
.node-wrap {
  outline: 1px dashed transparent;
  transition: outline-color 0.1s;
}
.node-wrap.editable {
  cursor: pointer;
}
.node-wrap.editable:hover {
  outline-color: #bde0fe; /** 悬停浅蓝提示可点 */
}
.node-wrap.editable.selected {
  outline: 2px solid #2563eb; /**选中实蓝框 */
}
</style>
