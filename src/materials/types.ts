import type {Component} from 'vue'
export interface PropConfig{
    key: string
    label: string
    type: 'text'|'number'|'color'|'select'
    default: any
}
export interface MaterialMeta{
    type: string
    label: string
    component: Component 
    props: PropConfig[]
}
//  一个组件节点的数据描述
export interface ComponentSchema{
    id: string,
    type: string,
    props: Record<string,any>,
    children?: ComponentSchema[]
}