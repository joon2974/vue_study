<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}님이 이겼습니다.</div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent';

    export default {
        components: {
          TableComponent,
        },
        data() {
            return{
                tableData: [
                  ['', '', ''],
                  ['', '', ''],
                  ['', '', ''],
                ],
                turn: 'O',
                winner: '',
            };
        },
        methods: {
            onChangeData(){
                //Vue 임포트 해서 Vue.set하는 것과 동일
                this.$set(this.tableData[1], 0, 'X');
            }
        },
    };
</script>

<style>
    table{
        border-collapse: collapse;
    }
    td{
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>