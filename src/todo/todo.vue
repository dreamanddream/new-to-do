<template>
    <section class="real-app">
        <input type="text"
               class="add-input"
               autofocus="autofocus"
               placeholder="接下来要做什么?"
               @keyup.enter="addTodo"
        >

        <!-- 使用items组件 -->
        <!-- :todo="todo" 往子组件item.vue 传入todo对象
             v-for="todo in filteredTodos" 遍历 todos 数组
             @del="deleteTodo" 接收子组件要触发的del方法
        -->
        <!-- 父组件使用@加子组件方法名进行监听，在子组件中$emit触发del方法，deleteTodo接受id-->
        <APP_Item :todo="todo"
                  v-for="todo in filteredTodos"
                  :key="todo.id"
                  @del="deleteTodo"
        >
        </APP_Item>
        <!--
            用 key 管理可复用的元素
            Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
            这么做除了使 Vue 变得非常快之外，还有其它一些好处。
        -->


        <!-- 使用tabs组件 -->
        <!--clearAllCompleted删除  -->
        <APP_Tabs :filter="filter"
                  :todos="todos"
                  @toggle="toggleFilter"
                  @clearAllCompleted="clearAllCompleted"
        >
        </APP_Tabs>
    </section>
</template>

<script>
    import APP_Item from './items.vue';
    import APP_Tabs from './tabs.vue';

    let id = 0;

    export default {
        // data() 声明数据，数据一般要放到顶层
        data() {
            return {
                // todos有很多，所以是一个数组
                todos: [],
                filter: 'all'
            }

        },

        // 计算
        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos;
                }
                // 如果this.filter === 'completed'，那么completed就是true，写法好灵活
                const completed = this.filter === 'completed';
                // 将todos数组中，completed为true的值过滤出来，并返回一个新数组,就是判断filter的状态是三个中的哪一个
                return this.todos.filter(todo => completed === todo.completed);

            }
        },

        // 组件
        components: {
            APP_Item,
            APP_Tabs,
        },

        //方法
        methods: {
            addTodo(e) {
                // alert(e.target.value)
                // e.target.value就代表用户在文本框中输入的内容
                // alert(e.target.value.trim())
                // 如果输入框中的值存在
                if (e.target.value.trim()) {
                    this.todos.unshift({
                        id: id++,
                        content: e.target.value.trim(),
                        completed: false
                    });
                    // 每次加入后将e.target.value的值清空
                    e.target.value = '';
                    console.log(this.todos)
                } else {
                    alert('傻X，输入不能为空 !-_-');
                }
            },
            deleteTodo(id) {
                // 函数嵌套的写法,如果当前id和传递的id一样那么就执行删除
                // id为子组件传递的id，findIndex的用法，返回为true的条件第一次出现的位置
                // alert("id"+id)
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state;

            },
            // 筛选too
            clearAllCompleted() {
                // 给todos赋一个新的值（即todo.completed为false的值）
                this.todos = this.todos.filter(todo => todo.completed === false)

            }
        }
    };
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>