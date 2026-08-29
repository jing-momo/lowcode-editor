import type { ComponentSchema } from "../materials/types";
export function createBenchmarkSchema(count = 1000): ComponentSchema[] {
  return Array.from(
    { length: count },
    (_, index): ComponentSchema => ({
      id: `benchmark-text-${index}`,
      type: "text",
      props: {
        text: `性能测试节点${index + 1}`,
        color: "#333333",
        fontSize: 16,
      },
    }),
  );
}
