<template>
  <!-- 遍历schema 每个节点渲染成对应物料组件 -->
   <component 
   v-for="item in nodes"
   :key="item.id"
   :is="materials[item.type].component"
   v-bind="item.props"
   >
    <!-- 有子节点就递归（当前物料没children，这段先不触发，做容器组件是生效） -->
     <Renderer v-if="item.children?.length" :nodes="item.children"></Renderer>
   </component>
</template>

<script setup lang="ts">
    import type { ComponentSchema } from '../materials/types';
    import { materials } from '../materials';
     defineProps<{nodes: ComponentSchema[]}>()
</script>

<style scoped>

</style>