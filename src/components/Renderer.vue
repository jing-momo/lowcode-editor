<!-- 渲染到画布-->
<template>
  <div
    v-for="item in nodes"
    :key="item.id"
    class="node-wrap"
    :class="{ selected: editor.selectedId === item.id }"
    @click.stop="editor.selectNode(item.id)"
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
</script>

<style scoped>
.node-wrap {
  outline: 1px dashed transparent;
  cursor: pointer;
  transition: outline-color 0.1s;
}
.node-wrap:hover {
  outline-color: #bde0fe; /** 悬停浅蓝提示可点 */
}
.node-wrap.selected {
  outline: 2px solid #2563eb; /**选中实蓝框 */
}
</style>
