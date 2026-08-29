import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ComponentSchema } from "../materials/types";
import { materials } from "../materials";
import { createBenchmarkSchema } from "../utils/createBenchmarkSchema";
import heroUrl from "../assets/hero.png";
export type MoveDirection = "up" | "down";
export type EditorMode = "edit" | "preview";
interface Command {
  execute(): void;
  undo(): void;
}
//  保存当前的画布内容 当前选中的组件id 组件对象
export const useEditorStore = defineStore("editor", () => {
  // 画布的真相之源：这份schema 数据驱动整个画布渲染
  const schema = ref<ComponentSchema[]>([
    {
      id: "1",
      type: "text",
      props: { text: "我是画布上的文字", color: "#e63946", fontSize: 20 },
    },
    { id: "2", type: "button", props: { text: "点我看看", btnType: "button" } },
    {
      id: "3",
      type: "image",
      props: { src: heroUrl, width: 120 },
    },
  ]);
  // 当前选中组件的id
  const selectedId = ref<string | null>(null);
  // 当前选中的组件对象(computed:selectedId 变=》自动重算)
  const selectedNode = computed(
    () => schema.value.find((i) => i.id === selectedId.value) ?? null,
  );
  const mode = ref<EditorMode>("edit");
  const isPreview = computed(() => mode.value === "preview");
  // 建立两个栈存放撤销或者重做的操作
  const undoStack = ref<Command[]>([]);
  const redoStack = ref<Command[]>([]);
  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);
  // 设置方式
  function setMode(newMode: EditorMode) {
    mode.value = newMode;
    if (newMode === "preview") {
      selectedId.value = null;
    }
  }
  // 点击选中
  function selectNode(id: string) {
    selectedId.value = id;
  }

  // 后续w1属性联动要用（先占位）
  function updateProps(id: string, newProps: Record<string, any>) {
    const item = schema.value.find((i) => i.id === id);
    if (item) item.props = { ...item.props, ...newProps };
  }
  function commitProps(
    id: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ) {
    const item = schema.value.find((i) => i.id === id);
    if (!item) return;
    const after = { ...newProps };
    const before = { ...oldProps };
    const command: Command = {
      execute() {
        updateProps(id, after);
      },
      undo() {
        updateProps(id, before);
      },
    };
    executeCommand(command);
  }
  // 新增节点
  function addNode(type: string) {
    const material = materials[type];
    if (!material) return;
    const defaultProps = Object.fromEntries(
      material.props.map((prop) => [prop.key, prop.default]),
    );

    const node: ComponentSchema = {
      id: crypto.randomUUID(),
      type,
      props: defaultProps,
    };
    const previousSelectedId = selectedId.value;
    // 创建指令
    const command: Command = {
      execute() {
        schema.value.push(node);
        selectedId.value = node.id;
      },
      undo() {
        const index = schema.value.findIndex((item) => item.id === node.id);
        if (index !== -1) {
          schema.value.splice(index, 1);
        }
        selectedId.value = previousSelectedId;
      },
    };
    executeCommand(command);
  }
  // 删除节点
  function deleteNode(id: string) {
    const index = schema.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    const node = schema.value[index];
    const previousSelectedId = selectedId.value;
    const command: Command = {
      execute() {
        const currentIndex = schema.value.findIndex((item) => item.id === id);
        if (currentIndex === -1) return;
        schema.value.splice(currentIndex, 1);
        if (selectedId.value === id) {
          selectedId.value = null;
        }
      },
      undo() {
        schema.value.splice(index, 0, node);
        if (previousSelectedId === id) selectedId.value = id;
      },
    };
    executeCommand(command);
  }
  function moveNodeToIndex(id: string, targetIndex: number) {
    const currentIndex = schema.value.findIndex((item) => item.id === id);
    if (currentIndex === -1) return;
    if (targetIndex < 0 || targetIndex >= schema.value.length) return;
    const [node] = schema.value.splice(currentIndex, 1);
    if (!node) return;
    schema.value.splice(targetIndex, 0, node);
  }
  // 移动节点
  function moveNode(id: string, direction: MoveDirection) {
    const index = schema.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= schema.value.length) return;
    const command: Command = {
      execute() {
        moveNodeToIndex(id, targetIndex);
      },
      undo() {
        moveNodeToIndex(id, index);
      },
    };
    executeCommand(command);
  }
  // 执行新命令
  function executeCommand(command: Command) {
    command.execute();
    undoStack.value.push(command);
    redoStack.value = [];
  }
  function undo() {
    const command = undoStack.value.pop();
    if (!command) return;
    command.undo();
    redoStack.value.push(command);
  }
  function redo() {
    const command = redoStack.value.pop();
    if (!command) return;
    command.execute();
    undoStack.value.push(command);
  }
  // 创建大量节点做性能测试
  function loadBenchmarkSchema(count = 1000) {
    if (!import.meta.env.DEV) return;
    schema.value = createBenchmarkSchema(count);
    selectedId.value = null;
    undoStack.value = [];
    redoStack.value = [];
  }
  // 撤销
  return {
    canUndo,
    canRedo,
    undo,
    redo,
    schema,
    selectedId,
    selectedNode,
    selectNode,
    updateProps,
    commitProps,
    addNode,
    deleteNode,
    moveNode,
    mode,
    isPreview,
    setMode,
    loadBenchmarkSchema,
  };
});
