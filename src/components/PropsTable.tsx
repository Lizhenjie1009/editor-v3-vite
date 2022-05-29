import { defineComponent, VNode, defineProps, PropType, computed, defineEmits } from 'vue'
import { reduce } from 'lodash'
import { TextComponentProps } from '../defaultProps'
import { mapPropsToForms } from '../propsMap'
import { Input, InputNumber, Slider, Radio, Select } from 'ant-design-vue'

const mapToComponent = {
  'a-textarea': Input.TextArea,
  'a-input-number': InputNumber,
  'a-slider': Slider,
  'a-radio-group': Radio.Group,
  'a-radio-button': Radio.Button,
  'a-select': Select,
  'a-select-option': Select.Option,
} as any


// 当前渲染所需要的类型
interface FormProps {
  component: string
  subComponent?: string
  value: string
  extraProps?: {
    [key: string]: any
  }
  text?: string
  options?: { text: string | VNode; value: any }[]
  initalTransform?: (v: any) => any // 转换组件库对应需要的类型
  valueProp: string // 非组件库组件
  eventName: string
  events: { [key: string]: (e: any) => void }
}

// 横线转驼峰
function capitalizeFirstLetter (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      required: true
    }
  },
  emits: ['change'],
  setup(props, context){
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          /**
           * key隐式错误为string
           * mapPropsToForms类型为PropsToForms
           * PropsToForms中的item为TextComponentProps之一
           *  需要类型断言为TextComponentProps中的之一
           */
          const newKey = key as keyof TextComponentProps
          const item = mapPropsToForms[newKey]
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initalTransform,
              afterTransform
            } = item
            const newItem: FormProps = {
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              eventName,
              events: {
                // [eventName]动态加载事件名称
                ['on' + capitalizeFirstLetter(eventName)]: (e: any) =>
                context.emit('change', {
                    key,
                    value: afterTransform ? afterTransform(e) : e
                  })
              }
            }
            // item.value = item.initalTransform ? item.initalTransform(value) : value
            // item.valueProp = item.valueProp ? item.valueProp : 'value'
            // {} as PropsToForms
            // {} as Required<PropsToForms> 必选类型不会推断出问题
            /**
             * {}隐式any类型，不能找到对应的key
             * 断言 {} as PropsToForms
             */
            result[newKey] = newItem
          }
          return result
        },
        // {} as PropsToForms
        {} as { [key: string]: FormProps }
      )
    })
    
    return () => (
      <div class='props-table'>
        {
          Object.keys(finalProps.value).map(key => {
            const value = finalProps.value[key]
            const ComponentName = mapToComponent[value.component]
            const SubComponent = value.subComponent ? mapToComponent[value.subComponent] : ''
            const props = {
              [value.valueProp]: value.value,
              ...value.extraProps,
              ...value.events
            }
            return (
              <div key={key} class='prop-item'>
                {value.text && <span class="label">{ value.text }</span>}
                <div class="prop-component">
                  <ComponentName {...props}>
                    {value.options && 
                      value.options.map(option => {
                        return (
                          <SubComponent value={option.value}>{option.text}</SubComponent>
                        )
                      })
                    }
                  </ComponentName>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
})
