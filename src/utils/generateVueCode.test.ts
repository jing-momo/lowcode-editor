import { describe, expect, it } from "vitest";
import type { ComponentSchema } from "../materials/types";
import { generateVueCode } from "./generateVueCode";

describe("generateVueCode", () => {
  it("按照Schema顺序生成三类物料", () => {
    const schema: ComponentSchema[] = [
      {
        id: "1",
        type: "text",
        props: {
          text: "标题",
          color: "#ff0000",
          fontSize: 20,
        },
      },
      {
        id: "2",
        type: "button",
        props: {
          text: "提交",
          btnType: "submit",
        },
      },
      {
        id: "3",
        type: "image",
        props: {
          src: "/logo.png",
          width: 120,
        },
      },
    ];

    const code = generateVueCode(schema);

    expect(code).toContain(
      '<div style="color: #ff0000;font-size: 20px;">标题</div>',
    );
    expect(code).toContain('<button type="submit">提交</button>');
    expect(code).toContain('<img src="/logo.png" style="width:120px" />');
    expect(code.indexOf("标题")).toBeLessThan(code.indexOf("提交"));
    expect(code.indexOf("提交")).toBeLessThan(code.indexOf("/logo.png"));
  });

  it("转义用户输入的HTML特殊字符", () => {
    const schema: ComponentSchema[] = [
      {
        id: "1",
        type: "text",
        props: {
          text: `<div> & "Vue" 'test'`,
          color: "#333333",
          fontSize: 16,
        },
      },
    ];

    const code = generateVueCode(schema);
    expect(code).toContain("&lt;div&gt; &amp; &quot;Vue&quot; &#39;test&#39;");
    expect(code).not.toContain(`<div> & "Vue" 'test'`);
  });

  it("未知物料只生成固定安全注释", () => {
    const code = generateVueCode([
      {
        id: "1",
        type: "<script>alert(1)</script>",
        props: {},
      },
    ]);

    expect(code).toContain("<!-- 未知物料 -->");
    expect(code).not.toContain("alert(1)");
  });
});
