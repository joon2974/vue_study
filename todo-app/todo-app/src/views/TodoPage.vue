<template>
  <div>
    <header>
      <h2 class="container">Todo App</h2>
    </header>

    <div class="container">
      <add-form :value="query" @@submit="onInputTodo"></add-form>
      <tab :tabs="tabs" :selected-tab="selectedTab" @@change="onClickTab"></tab>
    </div>

    <div class="container">
      <list :selected-tab="selectedTab" :data="todoList" v-on:@finish="onClickFinish" v-on:@reset="onClickReset" v-on:@remove="onClickRemove"></list>
    </div>
  </div>
</template>

<script>
    import FormComponent from "../components/FormComponent";
    import TabComponent from "../components/TabComponent";
    import ListComponent from "../components/ListComponent";
    import SidebarComponent from "../components/SidebarComponent";

    import TodoModel from "../models/TodoModel";

    export default {
        name: 'todo-page',
        data(){
            return{
                query: '',
                tabs: ['todo', 'finish'],
                selectedTab: '',
                todoList: [],
            }
        },
        created() {
            this.selectedTab = this.tabs[0];
            this.search()
        },
        components: {
            'add-form': FormComponent,
            'tab': TabComponent,
            'list': ListComponent,
            'sidebar': SidebarComponent
        },
        methods: {
            search(){
                TodoModel.list(this.selectedTab).then(data => {
                    this.todoList = data;
                })
            },
            onClickTab(tab){
                this.selectedTab = tab;
                this.search();
            },
            onClickFinish(item){
                TodoModel.finish(item);
                this.search();
            },
            onClickReset(item){
                TodoModel.reset(item);
                this.search();
            },
            onInputTodo(query){
                TodoModel.add(query);
                this.selectedTab = this.tabs[0];
                this.search();
            },
            onClickRemove(item){
                TodoModel.remove(item);
                this.search();
            },
        }
    }

</script>
