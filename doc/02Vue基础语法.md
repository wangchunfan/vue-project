## 模板语法

- Mustache语法：{{ msg }}
- Html赋值：v-html = ""
- 绑定属性：v-bind:id = ""
- 使用表达式：{{ ok?'yes':'no'}}
- 文本赋值：v-text = ""
- 指令：v-if = ""
- 过滤器：{{ message | capitalize}}和 v-bind:id="rawId | formatId"

## Class和Style绑定

- 对象语法：v-bind:class="{ active:isActive, "text-danger":hasError}">
- 数组语法：

```
<div v-bind:class="[activeClass, errorClass]">
```

```
data:{
    activeClass: 'active',
    errorClass: 'text-danger'
}
```

- style绑定-对象语法：v-bind:style"{ color:activeColor, fontSize:fontSize + 'px'}"

## 条件渲染

- v-if
- v-else
- v-else-if
- v-show：控制显示隐藏，代码已经渲染到页面
- v-cloak

## vue事件处理器

- v-on:click="greet" 或者 @click="greet"
- 事件修饰符：v-on:click.stop（阻止冒泡）
- v-on:click.stop.prevent（阻止默认事件）
- v-on:click.self（给对象本身绑定事件）
- v-on:click.once（事件生效一次）
- 监听按键：v-on:keyup.enter(enter、tab、delete、esc...)

## vue组件

- 全局乳尖和局部组件
- 父子组件通讯-数据传递(props、emit；不允许子组件修改父组件变量)
- Slot：插槽