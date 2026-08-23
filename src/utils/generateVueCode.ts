import type { ComponentSchema } from "../materials/types";
function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderNode(node: ComponentSchema): string {
  switch (node.type) {
    case "text":
      return `    <div style="color: ${escapeHtml(node.props.color)};font-size: ${escapeHtml(node.props.fontSize)}px;">${escapeHtml(node.props.text)}</div>`;
    case "button":
      return `    <button type="${escapeHtml(node.props.btnType)}">${escapeHtml(node.props.text)}</button>`;
    case "image":
      return `    <img src="${escapeHtml(node.props.src)}" style="width:${escapeHtml(node.props.width)}px" />`;
    default:
      return `    <!-- 未知物料-->`;
  }
}

export function generateVueCode(schema: ComponentSchema[]): string {
  const content = schema.map(renderNode).join("\n");
  return `<template>
  <div class="lowcode-page">
${content}
  </div>
</template>
`;
}
