<template>
  <div class="material-panel">
    <div class="panel-title">物料区</div>
    <div v-for="m in materials" :key="m.type" class="materail-item">
        {{ m.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { materials } from '../materials';


</script>

<style scoped>
    .material-panel{
        width: 200px;
        background-color: #f5f5f5;
        border-right: 1px solid #ddd;
        padding: 12px;
    }
    .panel-title{
        font-weight: bold;
        margin-bottom: 12px;
    }
    .materail-item{
        padding: 8px;
        margin-bottom:8px;
        border:1px solid #ddd;
        border-radius: 4px;
        cursor:move;
    }
</style>