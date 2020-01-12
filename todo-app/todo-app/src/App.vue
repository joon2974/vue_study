<template>
  <div>
    <sidebar :menus="menu"></sidebar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SidebarComponent from './components/SidebarComponent'

  export default {
      name: 'app',
      data(){
          return{
              menu: [
                  {name: 'Opencarelab', path: '/'},
                  {name: 'Vue 소개', path: '/vueinfo'},
                  {name: 'Todo App', path: 'todo'},
              ]
          }
      },
      components:{
          'sidebar': SidebarComponent
      }
  }

</script>
