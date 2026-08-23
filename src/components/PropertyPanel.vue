<template>
  <div class="property-panel">
    <div v-if="!editor.selectedNode">点画布上的组件开始配置</div>
    <template v-else>
      <h3 class="title">{{ currentMeta?.label }}配置</h3>
      <div class="form-item" v-for="prop in currentMeta?.props" :key="prop.key">
        <label>{{ prop.label }}</label>
        <input
          v-if="prop.type === 'text'"
          type="text"
          :value="editor.selectedNode.props[prop.key]"
          @focus="startPropEdit(prop.key)"
          @change="
            commitProp(prop.key, ($event.target as HTMLInputElement).value)
          "
          @input="
            previewProp(prop.key, ($event.target as HTMLInputElement).value)
          "
        />

        <input
          v-else-if="prop.type === 'number'"
          type="number"
          :value="editor.selectedNode.props[prop.key]"
          @input="
            previewProp(
              prop.key,
              Number(($event.target as HTMLInputElement).value),
            )
          "
          @focus="startPropEdit(prop.key)"
          @change="
            commitProp(
              prop.key,
              Number(($event.target as HTMLInputElement).value),
            )
          "
        />

        <input
          v-else-if="prop.type === 'color'"
          type="color"
          :value="editor.selectedNode.props[prop.key]"
          @input="
            previewProp(prop.key, ($event.target as HTMLInputElement).value)
          "
          @focus="startPropEdit(prop.key)"
          @change="
            commitProp(prop.key, ($event.target as HTMLInputElement).value)
          "
        />

        <select
          v-else-if="prop.type === 'select'"
          :value="editor.selectedNode.props[prop.key]"
          @focus="startPropEdit(prop.key)"
          @change="
            commitProp(prop.key, ($event.target as HTMLInputElement).value)
          "
        >
          <option v-for="opt in prop.options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>
      <div class="option_btn">
        <button @click="deleteData" type="button" class="delete_btn">
          删除
        </button>
        <button
          :disabled="checkIndex === 0"
          @click="moveData('up')"
          type="button"
          class="move_btn"
        >
          上移
        </button>
        <button
          :disabled="checkIndex === editor.schema.length - 1"
          @click="moveData('down')"
          type="button"
          class="move_btn"
        >
          下移
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from "../stores/editor";
import { computed } from "vue";
import { materials } from "../materials";
import type { MoveDirection } from "../stores/editor";
const editor = useEditorStore();
// 当前选中的meta配置（用它来知道该渲染那些表单项） 通过store得到当前选中的元素
const currentMeta = computed(() =>
  editor.selectedNode ? materials[editor.selectedNode.type] : null,
);
const checkIndex = computed(() => {
  return editor.schema.findIndex((item) => item.id === editor.selectedNode?.id);
});
interface EditSession {
  nodeId: string;
  key: string;
  oldValue: any;
}
let editSession: EditSession | null = null;
// 保存当前选中元素当前属性的值（为后期修改后恢复使用）
function startPropEdit(key: string) {
  const node = editor.selectedNode;
  if (!node) return;
  editSession = {
    nodeId: node.id,
    key,
    oldValue: node.props[key],
  };
}

// 改某个属性==》统一走store的updateProps(单项数据流)
function previewProp(key: string, value: any) {
  if (editor.selectedNode) {
    editor.updateProps(editor.selectedNode.id, { [key]: value });
  }
}
// 修改完成后调用修改命令后面供给撤销重做功能使用
function commitProp(key: string, value: any) {
  const session = editSession;
  editSession = null;

  if (!session) return;
  if (session.key !== key) return;
  if (Object.is(session.oldValue, value)) return;

  editor.commitProps(
    session.nodeId,
    { [key]: session.oldValue },
    { [key]: value },
  );
}
// 删除节点
function deleteData() {
  if (editor.selectedNode?.id) {
    editor.deleteNode(editor.selectedNode.id);
  }
}
// 上移 || 下移节点
function moveData(direction: MoveDirection) {
  if (editor.selectedNode?.id) {
    editor.moveNode(editor.selectedNode.id, direction);
  }
}
</script>

<style scoped>
.property-panel {
  width: 300px;
  background-color: #f5f5f5;
  border-left: 1px solid #ddd;
  padding: 16px;
}
.empty {
  color: #999;
  margin-top: 40px;
  text-align: center;
}
.title {
  font-size: 16px;
  margin-bottom: 16px;
}
.form-item {
  margin-bottom: 14px;
}
.form-item label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: #555;
}
.form-item input,
.form-item select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.option_btn {
  text-align: center;
  .delete_btn {
    /* margin-left: 50%;
    transform: translateX(-50%); */
    border: 1px solid #eb5d5d;
    color: #eb5d5d;
    border-radius: 2px;
    cursor: pointer;
  }
  .move_btn {
    margin-left: 10px;
    border: 1px solid #2abce4;
    color: #2abce4;
    border-radius: 2px;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
