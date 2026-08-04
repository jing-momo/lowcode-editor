import MText from './MText.vue'
import MButton from './MButton.vue'
import MImage from './MImage.vue'
import type { MaterialMeta } from './types'

export const materials:Record<string, MaterialMeta>={
    text:{
        type: 'text',label: '文本', component: MText,
        props:[
            {key:'text',label: '内容',type: 'text', default: '文本'},
            {key: 'color',label: '颜色',type: 'color', default: '#333333'},
            {key: 'fontSize',label: '字号',type: 'number', default:16}
        ]
    },
    button:{
        type: 'button',label: '按钮', component: MButton,
        props:[
            {key: 'text',label: '按钮文字',type: 'text', default: '按钮'},
            {key: 'btnType', label: '类型', type: 'select', default: 'button'}
        ]
    },
    image: {
        type: 'image', label: '图片', component:MImage,
        props:[
            {key: 'src', label: '图片地址',type: 'text',default: ''},
            {key: 'width',label: '宽度',type: 'number', default:100}
        ]
    }
}