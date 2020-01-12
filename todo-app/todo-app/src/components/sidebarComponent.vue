<template>
  <div class="sidenav" :style="widthObject">
    <div class="openmenu" @click='openNav'>
      <img class="openImg" src="../assets/extend.png">
    </div>
    <ul v-if="openSidebar">
        <router-link :to="menu.path" v-for="menu in menus" :key="menu.name">{{menu.name}}</router-link>
    </ul>
  </div>
</template>

<script>
  export default {
      props: ['menus'],
      computed: {
          widthObject(){
              if(this.openSidebar === false){
                  return {width: "50px"}
              }else{
                  return {width: "250px"}
              }
          },
          RoutePath(){
              if(this.menu === 'opencarelab'){
                  return '/';
              }else if(this.menu === 'vue 소개'){
                  return '/vueinfo';
              }else{
                  return '/todo';
              }
          }
      },
      data() {
          return{
              openSidebar: false,
              clickedMenu: 'opencarelab'
          };
      },
      methods: {
          openNav(){
              if(this.openSidebar === false){
                  this.openSidebar = true;
              }else{
                  this.openSidebar = false;
              }
          },
      }
  }
</script>
