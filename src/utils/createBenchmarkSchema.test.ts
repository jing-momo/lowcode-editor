import { describe, expect, it } from "vitest";
import { createBenchmarkSchema } from "./createBenchmarkSchema";

describe("createBenchmarkSchema", () => {
  it("生成指定数量的文本节点", () => {
    const schema = createBenchmarkSchema(3);
    expect(schema).toHaveLength(3);
    expect(schema[0]).toEqual({
      id: "benchmark-text-0",
      type: "text",
      props: {
        text: "性能测试节点1",
        color: "#333333",
        fontSize: 16,
      },
    });
  });

  it("每次调用都返回独立的数据", () => {
    const first = createBenchmarkSchema(2);
    const second = createBenchmarkSchema(2);
    expect(first).not.toBe(second);
    expect(first[0]).not.toBe(second[0]);

    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id));
  });
});
