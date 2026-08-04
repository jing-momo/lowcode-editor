import {defineStore} from 'pinia'
import {ref} from 'vue' 
import type {ComponentSchema} from '../materials/types'

export const useEditorStore = defineStore('editor', ()=>{
    // 画布的真相之源：这份schema 数据驱动整个画布渲染
    const schema = ref<ComponentSchema[]>([
        {id: '1', type: 'text', props: {text: '我是画布上的文字', color: '#e63946', fontSize: 20}},
        {id: '2', type:'button',props: { text: '点我看看', btnType: 'button' } },
        {id: '3', type: 'image', props:{ src: '', width: 120 }}
    ])
    // 后续w1属性联动要用（先占位）
    function updateProps(id: string, newProps: Record<string,any>){
        const item = schema.value.find(i=>i.id===id) 
        if(item) item.props = {...item.props,...newProps}
    }
    return {schema,updateProps}
})