// 接口数据 提供给  使用  只负责开发阶段类型检测，不参与程序运行
import type { Component } from "vue";
export interface PropConfig {
  key: string;
  label: string;
  type: "text" | "number" | "color" | "select";
  default: any;
  options?: string[]; // select 的可选项
}
export interface MaterialMeta {
  type: string;
  label: string;
  component: Component;
  props: PropConfig[];
}
//  一个组件节点的数据描述
export interface ComponentSchema {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentSchema[];
}
