import { createPinia, setActivePinia } from "pinia";
import { useEditorStore } from "./editor";
import { beforeEach, describe, expect, it } from "vitest";

describe("editor store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it("添加节点后可以撤销和重做， 并复用同一个ID", () => {
    const editor = useEditorStore();
    const initialIds = editor.schema.map((item) => item.id);
    editor.addNode("text");
    const addedNode = editor.schema.at(-1);

    expect(addedNode).toBeDefined();
    expect(addedNode?.type).toBe("text");
    expect(editor.schema).toHaveLength(initialIds.length + 1);
    expect(editor.selectedId).toBe(addedNode?.id);
    expect(editor.canUndo).toBe(true);
    editor.undo();
    expect(editor.schema.map((item) => item.id)).toEqual(initialIds);
    expect(editor.selectedId).toBeNull();
    expect(editor.canRedo).toBe(true);
    editor.redo();
    expect(editor.schema).toHaveLength(initialIds.length + 1);
    expect(editor.schema.at(-1)?.id).toBe(addedNode?.id);
    expect(editor.selectedId).toBe(addedNode?.id);
  });

  it("删除节点后，撤销可以恢复原位置和选中状态", () => {
    const editor = useEditorStore();
    const initialIds = editor.schema.map((item) => item.id);
    editor.selectNode("2");
    editor.deleteNode("2");
    expect(editor.schema.map((item) => item.id)).toEqual(["1", "3"]);
    expect(editor.selectedId).toBeNull();
    expect(editor.canUndo).toBe(true);
    editor.undo();
    expect(editor.schema.map((item) => item.id)).toEqual(initialIds);
    expect(editor.selectedId).toBe("2");
    expect(editor.canRedo).toBe(true);
    editor.redo();
    expect(editor.schema.map((item) => item.id)).toEqual(["1", "3"]);
    expect(editor.selectedId).toBeNull();
  });

  it("移动节点后可以撤销和重做", () => {
    const editor = useEditorStore();

    editor.selectNode("2");
    editor.moveNode("2", "down");

    expect(editor.schema.map((item) => item.id)).toEqual(["1", "3", "2"]);
    expect(editor.selectedId).toBe("2");
    expect(editor.canUndo).toBe(true);

    editor.undo();

    expect(editor.schema.map((item) => item.id)).toEqual(["1", "2", "3"]);
    expect(editor.selectedId).toBe("2");
    expect(editor.canRedo).toBe(true);

    editor.redo();

    expect(editor.schema.map((item) => item.id)).toEqual(["1", "3", "2"]);
    expect(editor.selectedId).toBe("2");
  });
  it("边界上的无效移动不会改变 Schema，也不会产生撤销记录", () => {
    const editor = useEditorStore();
    const initialIds = editor.schema.map((item) => item.id);

    editor.moveNode("1", "up");

    expect(editor.schema.map((item) => item.id)).toEqual(initialIds);
    expect(editor.canUndo).toBe(false);

    editor.moveNode("3", "down");

    expect(editor.schema.map((item) => item.id)).toEqual(initialIds);
    expect(editor.canUndo).toBe(false);
  });
  it("属性修改后可以撤销和重做", () => {
    const editor = useEditorStore();
    const node = editor.schema.find((item) => item.id === "1");

    expect(node).toBeDefined();

    const oldText = node?.props.text;

    editor.commitProps("1", { text: oldText }, { text: "修改后的文字" });

    expect(editor.schema.find((item) => item.id === "1")?.props.text).toBe(
      "修改后的文字",
    );
    expect(editor.canUndo).toBe(true);

    editor.undo();

    expect(editor.schema.find((item) => item.id === "1")?.props.text).toBe(
      oldText,
    );
    expect(editor.canRedo).toBe(true);

    editor.redo();

    expect(editor.schema.find((item) => item.id === "1")?.props.text).toBe(
      "修改后的文字",
    );
  });

  it("撤销后执行新命令会清空重做分支", () => {
    const editor = useEditorStore();

    editor.addNode("text");
    editor.undo();

    expect(editor.canRedo).toBe(true);

    editor.deleteNode("1");

    expect(editor.canRedo).toBe(false);

    const idsAfterDelete = editor.schema.map((item) => item.id);

    editor.redo();

    expect(editor.schema.map((item) => item.id)).toEqual(idsAfterDelete);
  });
});
