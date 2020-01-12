<template>
  <div>
    <ul class="list">
      <li v-for="(item, index) in data" :key="index">
        <span class="glyphicon glyphicon-asterick"></span>
        {{item.todo}}
        <span class="todoBtn label label-primary" v-if="selectedTab === 'todo'" @click="finishBtnClick(index)">
          <span class="glyphicon glyphicon-ok"></span>
        </span>
        <span class="todoBtn label label-danger" v-if="selectedTab === 'finish'" @click="resetBtnClick(index)">reset</span>
        <span class="todoBtn label label-warning" @click="removeBtnClick(item)">remove</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
      props: ['data', 'selectedTab'],
      methods: {
          finishBtnClick(item){
              this.$emit('@finish', item)
          },
          resetBtnClick(item){
              this.$emit('@reset', item)
          },
          removeBtnClick(item){
              this.$emit('@remove', item)
          }
      }
  }
</script>
