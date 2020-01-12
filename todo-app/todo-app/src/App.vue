<template>
  <div>
    <sidebar :menus="menu"></sidebar>
    <div>
      <router-view></router-view>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import SidebarComponent from './components/SidebarComponent'
  import FooterComponent from "./components/FooterComponent";

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
          FooterComponent,
          'sidebar': SidebarComponent,
          'footer-component': FooterComponent
      }
  }

</script>
